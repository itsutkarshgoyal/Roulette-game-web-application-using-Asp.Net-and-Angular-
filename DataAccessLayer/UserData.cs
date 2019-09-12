using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
   public static class UserData
    {
        
        public static List<user> viewUsers()
        {
            List<user> lst = null;
            using (CasinoEntities db = new CasinoEntities())
            {
                lst = (from u in db.users select u).ToList();
            }
            return lst;
        }

        public static List<user> SearchUsers(user search)
        {
            List<user> lst = null;
            using (CasinoEntities db = new CasinoEntities())
            {
                lst = db.users.Where(p =>

                        ((p.name.Equals(search.name) && search.email==null && search.mobile==0) ||
                        (search.name.Equals(null) && search.email.Equals(p.email) && search.mobile == 0) ||
                        (search.name.Equals(null) && search.email.Equals(null) && search.mobile == p.mobile) ||
                        (search.name.Equals(p.name) && search.email.Equals(p.email) && search.mobile == 0) ||
                        (search.name.Equals(null) && search.email.Equals(p.email) && search.mobile == p.mobile) ||
                        (search.name.Equals(p.name) && search.email.Equals(null) && search.mobile == p.mobile) ||
                        (search.name.Equals(p.name) && search.email.Equals(p.email) && search.mobile == p.mobile) 


                        ) 
                                     
                                     ).
                                            OrderBy(p => p.name).ToList();
            }
            return lst;
        }

        public static user LoginUser(user std)
        {
            CasinoEntities db = new CasinoEntities();
            var lst = db.users.Where(a => a.uniqueID.Equals(std.uniqueID)).FirstOrDefault();
           
            return lst;
        }

        public static user RechargeUser(user std)
        {
            if (std.balance > 0)
            {
                CasinoEntities db = new CasinoEntities();
                user lst = (from u in db.users where std.uniqueID == u.uniqueID select u).SingleOrDefault();
                lst.balance = lst.balance + std.balance;
                db.SaveChanges();
                return lst;
            }
            else return null;
        }

        public static user ReduceUser(user std)
        {

            CasinoEntities db = new CasinoEntities();
            user lst = (from u in db.users where std.uniqueID == u.uniqueID select u).SingleOrDefault();
            lst.balance = lst.balance - std.balance;
            db.SaveChanges();

            return lst;
        }

        public static user CheckUser(user std)
        {

            CasinoEntities db = new CasinoEntities();
            user lst = (from u in db.users where std.uniqueID == u.uniqueID select u).SingleOrDefault();
           

            return lst;
        }

        public static string SaveUser(user detail)
        {

            using (CasinoEntities db = new CasinoEntities())
            {
                var save=detail.uniqueID ;
                var exist = (from u in db.users where u.uniqueID == detail.uniqueID select u.email).ToList().FirstOrDefault();
                if (exist == null)
                {
                    detail.balance = 500;
                    // detail.password = GetBase64EncodedString(detail.password);
                    db.users.Add(detail);
                    db.SaveChanges();
                }
                else
                {
                    throw new Exception("User Already Exists");
                }
            
            return save;
            }
        }
    }
}
