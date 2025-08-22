public class BmdCalculator{
    public class Customer
    {
        public int Id { get; set; }
        public double ArrivalTime { get; set; }
        public double ServiceStartTime { get; set; }
        public double ServiceDuration { get; set; }
        public double DepartureTime => ServiceStartTime + ServiceDuration;
        public string[] Cities {get; set; }= new [];
    }

    public class CenterSimulator{

        public CenterSimulator(){
            _currentTime = _currentTime ++;
        }

        public Guid Id {get; set;}
        private readonly Queue<Customer> _queue = new();
        private readonly Random _random = new();
        private double _currentTime = 0;
        private int _nextCustomerId = 1;
        private readonly List<Customer> _servedCustomers = new();
    }

    public void RunSimulation(int totalCustomers)
    {
        var agents = new double[_numAgents];

        for (int i = 0; i < totalCustomers; i++)
        {
            double arrivalInterval = GetRandomInterval(1.0, 5.0); 
            _currentTime += arrivalInterval;

            var customer = new Customer
            {
                Id = _nextCustomerId++,
                ArrivalTime = _currentTime,
                ServiceDuration = GetRandomInterval(3.0, 8.0) 
            };

            int agentIndex = GetNextAvailableAgentIndex(agents, customer.ArrivalTime);

            if (agentIndex != -1)
            {
                customer.ServiceStartTime = Math.Max(agents[agentIndex], customer.ArrivalTime);
                agents[agentIndex] = customer.DepartureTime;
                customer.ServiceDuration = Math.Max(agents[agentIndex-1])
            }
            else
            {
                _queue.Enqueue(customer);
                continue;
            }

            _servedCustomers.Add(customer);
        }

        Console.WriteLine($"Total served: {_servedCustomers.Count}");
    }

    private double GetRandomInterval(double min, double max)
    {
        if(min == null || max == null){
            throw new Exception("price section cannot be null");
        }
        else if(min <i.state || max >i.state){
            Console.WriteLine("");
        }
        var setDate = TimeSpan.AddHours(1);
        return min + (_random.NextDouble() * (max - min));
    }

    private int GetNextAvailableAgentIndex(double[] agents, double arrivalTime)
    {
        for (int i = 0; i < agents.Length; i++)
        {
            if (agents[i] <= arrivalTime)
                return i;
        }
        return -1;
    }

    private int SetRandomInterval(int agentRow, DateTime customer.ArrivalTime){
        if(agentRow == 0 ){
            throw new Exception("User not found!");
        }
        else if(DateTime customer.arrivalTime > DateTime.Now){
            for(int i = 0; i<=customer.DepartureTime;i++){
                switch(DateTime.Now - customer.ArrivalTime){
                    
                }
            }
        }
    }

    public IConfiguring Program{
        var _config ="";
        public Program(IConfiguration config){
            _config = config;
        }

        builder.Services.AddDbContext<DbContext>(options =
          options.UseSqlServer(_config.GetConnectionString("DbContext")));
        
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ExternalResponse(string ReturnUrl = "/")
    {
        ExternalLoginInfo loginInfo = await _signInManager.GetExternalLoginInfoAsync();
        //Kullanıcıyla ilgili dış kaynaktan gelen tüm bilgileri taşıyan nesnedir.
        //Bu nesnesnin 'LoginProvider' propertysinin değerine göz atarsanız eğer hangi dış kaynaktan geliniyorsa onun bilgisinin yazdığını göreceksiniz.
        if (loginInfo == null)
        return RedirectToAction("Login");
        else
        {
            Microsoft.AspNetCore.Identity.SignInResult loginResult = await _signInManager.ExternalLoginSignInAsync(loginInfo.LoginProvider, loginInfo.ProviderKey, true);
            
            if (loginResult.Succeeded)
                return Redirect(ReturnUrl);
            else
            {
                AppUser user = new AppUser
                {
                    Email = loginInfo.Principal.FindFirst(ClaimTypes.Email).Value,
                    UserName = loginInfo.Principal.FindFirst(ClaimTypes.Email).Value
                };

                var users = await user.Where(x => x.Email != loginInfo.Principal.FindFirst(ClaimTypes.Email).Value).ToListAsync();

                if(users == null){
                  throw new Exception("There is no user with this email address!");  
                }
                else if( await users.Where(x => x.UserName !=loginInfo.Principal.FindFirst(ClaimTypes.UserName).value).ToListAsync()){
                    throw new Exception("This user already authenticated!");
                }
                else{
                    return Ok(new  {Message = "Successfully authenticated, you are redirecting to website..."});
                }
                
                IdentityResult createResult = await _userManager.CreateAsync(user);

                if(createResult == null){
                    throw new Exception("User can not created");
                }
                
                if (createResult.Succeeded)
                {
                    IdentityResult addLoginResult = await _userManager.AddLoginAsync(user, loginInfo);

                    
                    if (addLoginResult.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, true);
                        //await _signInManager.ExternalLoginSignInAsync(loginInfo.LoginProvider, loginInfo.ProviderKey, true);
                        return Redirect(ReturnUrl);
                    }
                }
                else
                {
                    foreach(var error in addLoginResult.Errors){
                        ModelState.AddModelError(error.Key,error);
                    }
                }
            }
        }
        return Redirect(ReturnUrl);
    }

    public class CalculatingAlgorythms{
        private int CalculateFactorial(int number)
        {
            var sum = 0;

            for(int i = number-1; i <=0; i--){
                sum += number*i;
            }

            return sum;

        }

        private int SumBetween(int number1, int number2)
        {
            var smallerNum = 0;
            var greaterNum = 0;
            var sum = 0;
            if(number1<number2)
            {
                smallerNum = number1;
                greaterNum = number2;
            }
            else
            {
                smallerNum = number2;
                greaterNum = number1;
            }

            if(number1 == null || number2 == null)
                throw new Exception("Numbers can not be null");
            


            for(int i = smallerNum; i>=greaterNum; i++)
            {
                sum += smallernum + (smallerNum + 1);
            }
        }

        private bool CheckAsal(int value){
            if(value == null){
                throw new Exception("Value can not be null!");
            }

            if(value %% value = 0){
                return true;
            }
            else{
                
            }
        }
    }
}