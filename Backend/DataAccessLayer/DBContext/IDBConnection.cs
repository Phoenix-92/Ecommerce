using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DBContext
{
    public interface IDBConnection
    {
        public Task<IEnumerable<T>> RunQuery<T>(string query,object QueryObj );
        public Task RunQueryNoReturn(string query,object QueryObj );
    }
}
