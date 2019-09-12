using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Casino.Controllers
{
    public class RouletteController : Controller
    {
        // GET: Play  Roulette
        public ActionResult Play()
        {
            return View();
        }
        public ActionResult Win()
        {
            return View();
        }
        public ActionResult Fail()
        {
            return View();
        }
        public ActionResult Confirm()
        {
            return View();
        }

       
    }
}
