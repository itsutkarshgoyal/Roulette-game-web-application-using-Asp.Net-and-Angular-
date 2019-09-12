using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;

namespace Shared
{
    public class dto_user //UserDTO
    {
        public int id { get; set; }
        [DataType("text")]
        
       // [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Name can contain only alphabets")]
        [RegularExpression(@"^[a-zA-Z ]*$", ErrorMessage = "Name can contain only alphabets")]
        public string name { get; set; }
        public System.DateTime date { get; set; }
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$",
           ErrorMessage = "E-mail is not valid")]
        public string email { get; set; }
        [RegularExpression(@"^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number.")]
        public long mobile { get; set; }
        public string copyOfId { get; set; }
        public string uniqueID { get; set; }
        public int balance { get; set; }
    }
}

