using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared;
using DataAccessLayer;
using System.Web.ModelBinding;

namespace BusinessLayer
{
    public class UserManager
    {
        public static string generateID()
        {
            return Guid.NewGuid().ToString("N");
        }
        public int GetAge(DateTime bornDate)
        {
            DateTime today = DateTime.Today;
            int age = today.Year - bornDate.Year;
            if (bornDate > today.AddYears(-age))
                age--;

            return age;
        }
        public List<user> ViewUsers()
        {

            return UserData.viewUsers();
        }

        public List<user> SearchUsers(user search)
        {

            return UserData.SearchUsers(search);
        }

        public user RechargeUsers(user detail)
        {
            //detail.uniqueID = "ded323";
            //user user = new user()
            //{

            //    uniqueID = detail.uniqueID
            //};
            return UserData.RechargeUser(detail);
        }

        public user ReduceUsers(user detail)
        {
            //detail.uniqueID = "ded323";
            //user user = new user()
            //{

            //    uniqueID = detail.uniqueID
            //};
            return UserData.ReduceUser(detail);
        }

        public user CheckUsers(user detail)
        {
            //detail.uniqueID = "ded323";
            //user user = new user()
            //{

            //    uniqueID = detail.uniqueID
            //};
            return UserData.CheckUser(detail);
        }


        public user LoginUser(dto_user dtoUser)
        {
            user user = new user()
            {

                uniqueID = dtoUser.uniqueID
            };
            return UserData.LoginUser(user);
        }
        public string SaveUser(dto_user detail)
        {
            detail.uniqueID = UserManager.generateID();
            var age = GetAge(detail.date);
            if (age < 18 && age <67)
            {
                return "0";
            }
            else
            {

            }

            user user = new user()
            {
                balance = detail.balance,
                uniqueID = detail.uniqueID,
                email = detail.email,
                mobile = (int)detail.mobile,
                date = (DateTime)detail.date,
                name = detail.name,
                copyOfId = detail.copyOfId
                
            };
            return UserData.SaveUser(user);
        }





    }
}
