using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Entities
{
    public class MailSettings
    {
        public string? Host { get; set; }
        public int Port { get; set; }
        public string? SenderMail { get; set; }
        public string? SenderPass { get; set; }
    }
}