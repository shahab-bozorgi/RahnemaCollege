import { Router } from "express";
import express from 'express';
import { User } from '../models/user';



export const app = Router()
const users: User[] = []
const port = 3000;

app.use(express.json());


app.post("/",(req, res) =>{
    res.json(users);
    return
})