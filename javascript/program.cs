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
  public HomeController(PropertyContext context, IHttpClientFactory client, IMapper mapper){
    _context = context;
    _client = client;
    _mapper = mapper;
}

public async Task<IActionResult> Index( TourReceiverDto tourReceiverDto){
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
      
    });
    await _context.SaveChangesAsync();
  }
}


public class TourReceiverDto{
    public Guid Id {get; set; }
    public string Name {get; set; }
    public List<Category> Category {get; set;} 
    public decimal price {get; set; }
    public DateTime StartDate {get; set; }
    public DateTime EndDate {get; set; }
    public AppUser Customers {get; set; }
}