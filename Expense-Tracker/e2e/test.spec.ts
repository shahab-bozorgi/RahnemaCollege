import request from 'supertest';
import { app } from '../src/api';

describe('Create User', () => {
  it('should get list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: '1', username: 'hossein zamani', password: '1234' },
      { id: '2', username: 'ali rashidi', password: '1234' }
    ]);
  });

  it('should create a new expense', async () => {
    const newExpense = {
        description: "Dinner",
        amount: 50,
        paidById: '1',
        groupId: '1',
        date: new Date().toISOString()
    };
    const response = await request(app)
        .post('/expenses')
        .send(newExpense);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');         
    expect(response.body.description).toBe(newExpense.description);
    expect(response.body.amount).toBe(newExpense.amount);
});
});


test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

describe('Create expnce', () => { 
  it('should get user balances in a group', async () => {
     const groupId = '1'; 
     const response = await request(app).get(`/group/${groupId}/balances`); 

     expect(response.status).toBe(200); 
     expect(response.body).toHaveProperty('1'); 
     expect(response.body).toHaveProperty('2');

  }); 
});
