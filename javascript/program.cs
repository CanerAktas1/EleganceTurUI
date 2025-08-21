public class GenerateTask{

    private readonly Context _context;
    private readonly _client;

  public GenerateTask(context context, IHttpClientFactory client){
    _context = context;
    _client = client; 
  }

  public IActionResult Privacy(){
    return View();
  }

    public string UserName {get;set;}
    public DateTime BirthDate {get;set;}
    public Tour FavoritedTours {get;set;}
}

public class HomeController:Controller{
  private readonly PropertyContext _context;
  private readonly IHttpClientFactory _client;
  private readonly IMapper _mapper;
  private readonly IMemoryCache _memoryCache;

  public HomeController(PropertyContext context, IHttpClientFactory client, IMapper mapper, IMemoryCache memorycache){
    _context = context;
    _client = client;
    _mapper = mapper;
    _memoryCache = memorycache;
}

public async Task<IActionResult> Index( TourReceiverDto tourReceiverDto){
    if(!_memoryCache.TryGetValue(CacheKeys.Entry, out NewCachedValue)){
        NewCachedValue.CachedTime = Datetime.Now;
        _memoryCache.Set(CacheKeys.Entry, NewCachedValue);
    }
    
    var client = _client.CreateClient();
    var response = await client.GetAsync("");
    if(!response.IsSucceddedStatusCode()){
      throw new Exception("API GATEWAY ERROR");
    }
    var stringData = await response.Content.ReadAsStringAsync();

    var jsonData = JsonConvert.DeserializeObject<tourReceiverDto>(stringData);

    var map = _mapper.Map<TourReceiverDto>(jsonData);
    await _context.add(map);
    await _context.AddAsync(new TourReceiver{
      Name = stringData.Name,
      Category = stringData.Category.Name,
      Price = stringData.PriceToString("#.##"),
      StartDate = stringData.StartDate,
      EndDate = stringData.EndDate,
      CustomerFullName = Customers.Where(x => x.Customer.Name && x.Customer.Surname).Include(x=> x.Tours).ThenInclude(x=> x.Tour.Title);
    });

      await _context.SaveChangesAsync();
  }
}


public class TourReceiverDto{
    public TourReceiverDto(){
      
    }
    public Guid Id {get; set; }
    public string Name {get; set; }
    public List<Category> Category {get; set;} 
    public decimal price {get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public AppUser Customers {get; set; }
}

public class SignalRHub:Hub{
   public SignalRHub(){
    var connection = new signalR.HubConnectionBuilder().withUrl("/signalRHub").build();

    connection.startConnection();

   }
}