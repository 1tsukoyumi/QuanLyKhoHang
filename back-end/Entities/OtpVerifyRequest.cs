using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Entities
{
    public class OtpVerifyRequest
    {
        public string? Email { get; set; }
        public string? Otp { get; set; }
    }
}