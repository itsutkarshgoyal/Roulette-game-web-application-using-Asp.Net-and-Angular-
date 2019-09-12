using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shared;
using BusinessLayer;
using DataAccessLayer;
using Casino.Components;

namespace Casino.Controllers
{
    [RoutePrefix("api/userApi")]
    public class UserApiController : ApiController
    {

        [Route("Login")]
        [HttpPost]
            public IHttpActionResult Login(dto_user dtoUser)
            {
                IHttpActionResult ret;

                UserManager userManager = new UserManager();
                var users = userManager.LoginUser(dtoUser);
                if (users != null)
                {
                    ret = Ok(users);

                }
                else
                {
                    ret = NotFound();
                }

                return ret;
            }
            public IHttpActionResult Get()
        {
            IHttpActionResult ret;

            BusinessLayer.UserManager vm = new BusinessLayer.UserManager();
            
           
               var variable = vm.ViewUsers();
           
            if (variable !=null)
            {
                ret = Ok(variable);
            }
            else
            {
                ret = NotFound();
            }

            return ret;
        }

        [HttpPost]
        public IHttpActionResult Post(dto_user dtoUser)
        {
            IHttpActionResult ret;
           
                UserManager userManager = new UserManager();
                var users = userManager.SaveUser(dtoUser);
                if (!users.Equals("0"))
                {
                    ret = Ok(users);
                }

                else
                {
                    ret = NotFound();
                }

                return ret;
            
        }
        [Route("SaveUser")]
        [HttpPost]
        public IHttpActionResult SaveUser(dto_user dtoUser)
        {
            IHttpActionResult ret;
            if (ModelState.IsValid)
            {


                UserManager users = new UserManager();
                var userManager = users.SaveUser(dtoUser);
                if (!userManager.Equals("0"))
                {
                    ret = Ok(userManager);
                }

                else
                {
                    var generateError = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Age must be minimum of 18 and max 68");
                    ret = ResponseMessage(generateError);
                    
                }

                return ret;
            }
            else
            {

                var generateError = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                ret = ResponseMessage(generateError);
                return ret;
            }
        }

        [Route("Search")]
        [HttpPost]
        public IHttpActionResult Search([FromBody]user search)
        {
            IHttpActionResult ret;
            UserManager userManager = new BusinessLayer.UserManager();
            var users = userManager.SearchUsers(search);
            if (users != null)
            {
                ret = Ok(users);
            }
            else
            {
                ret = NotFound();
            }

            return ret;
        }

        [Route("Recharge")]
        [HttpPost]
        public IHttpActionResult Recharge([FromBody]user recharge)
        {
            IHttpActionResult ret;
            UserManager userManager = new UserManager();
            var users = userManager.RechargeUsers(recharge);
            if (users != null)
            {
                ret = Ok(users);
            }
            else
            {
                var generateError = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Balance must be positive");
                ret = ResponseMessage(generateError);
               
            }

            return ret;
        }

        [Route("Reduce")]
        [HttpPost]
        public IHttpActionResult Reduce([FromBody]user recharge)
        {
            IHttpActionResult ret;
            UserManager userManager = new UserManager();
            var users = userManager.ReduceUsers(recharge);
            if (users != null)
            {
                ret = Ok(users);
            }
            else
            {
                ret = NotFound();
            }

            return ret;
        }

        [Route("Check")]
        [HttpPost]
        public IHttpActionResult Check([FromBody]user recharge)
        {
            IHttpActionResult ret;
            UserManager userManager = new UserManager();
            var users = userManager.CheckUsers(recharge);
            if (users != null)
            {
                ret = Ok(users);
            }
            else
            {
                ret = NotFound();
            }

            return ret;
        }


    }
}