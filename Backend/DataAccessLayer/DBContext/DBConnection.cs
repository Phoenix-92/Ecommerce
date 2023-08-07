using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DBContext
{
    public class DBConnection:IDBConnection
    {
        private IConfiguration _config;

        SqlConnection _connection;

        public DBConnection(IConfiguration Configuration)
        {
            _config = Configuration;
            _connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

        }
        public async Task<IEnumerable<T>> RunQuery<T>(string query, object QueryObj)
        {
            return await _connection.QueryAsync<T>(query, QueryObj);
        }

        public async Task RunQueryNoReturn(string query, object QueryObj)
        {
            await _connection.ExecuteAsync(query, QueryObj);            
        }
    }
}
