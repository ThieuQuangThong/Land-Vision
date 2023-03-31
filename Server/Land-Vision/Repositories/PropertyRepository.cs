﻿using Land_Vision.Data;
using Land_Vision.DTO;
using Land_Vision.Interface.IRepositories;
using Land_Vision.Models;
using Microsoft.EntityFrameworkCore;

namespace Land_Vision.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext _dbContext;
        public PropertyRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddPropertyAsync(Property property)
        {

            await _dbContext.Properties.AddAsync(property);
            return await SaveChangeAsync();
        }

        public async Task<bool> DeletePropertyAsync(Property property)
        {
            _dbContext.Properties.Remove(property);
            return await SaveChangeAsync();
        }

        public async Task<List<Property>> GetPropertiesAsync()
        {
            return await _dbContext.Properties.OrderBy(p => p.Id).ToListAsync();
        }


        public async Task<Property> GetPropertyAsync(int propertyId)
        {
            return await _dbContext.Properties.Where(p => p.Id == propertyId).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangeAsync()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }

        public async Task<bool> UpdatePropertyAsync(Property property)
        {
            _dbContext.Properties.Update(property);
            return await SaveChangeAsync();
        }
    }
}
