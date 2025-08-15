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

    private int SetRandomInterval(int agentRow, DateTime customer.ArrivalTime ){
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
                        ModelState.AddModelError("",error);
                    }
                }
            }
        }
        return Redirect(ReturnUrl);
    }
}