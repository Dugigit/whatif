using CSharpFunctionalExtensions;
using Dapr.Client;
using MediatR;
using WhatIf.Api.States;
using WhatIf.Api.Utils;

namespace WhatIf.Api.Commands.User
{
    public record LoginRequest(string Email, string Password) : IRequest<Guid>;
    
    public class LoginHandler : IRequestHandler<LoginRequest, Guid>
    {
        private readonly DaprClient daprClient;
        public LoginHandler(DaprClient daprClient)
        {
            this.daprClient = daprClient;
        }
        
        public async Task<Guid> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await daprClient.GetStateAsync<WhatIf.Api.States.User>("statestore", request.Email);
            if (user == null || user.Password.Crypt() != request.Password)
            {
                return Guid.Empty;
            }
            return user.Id;
        }
    }
}