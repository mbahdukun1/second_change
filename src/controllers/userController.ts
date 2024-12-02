import { Request, Response } from 'express';
import UserService from '../services/userService';
import { encryptPassword } from '../helpers/authHelper';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

class UserController {
  private userService: UserService;  
  private jwtSecret: string;  

  constructor() {  
    this.userService = new UserService();  
    this.jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  }  


  public createUser:any = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password, namaLengkap, nomorHandphone, alamat } = req.body;
      
     
      const encryptedPassword = await encryptPassword(password);

      const newUser = await this.userService.createUser({ email, password: encryptedPassword, namaLengkap, nomorHandphone, alamat });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

  
  public getAllUsers:any = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

  
  public getUserById:any = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(Number(id));
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

  
  public updateUser:any = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { email, password, namaLengkap, nomorHandphone, alamat } = req.body;
      
    
      const encryptedPassword = password ? await encryptPassword(password) : undefined;

      const updatedUser = await this.userService.updateUser(Number(id), { email, password: encryptedPassword, namaLengkap, nomorHandphone, alamat });
      if (updatedUser) {
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

 
  public deleteUser:any = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const deletedUser = await this.userService.deleteUser(Number(id));
      if (deletedUser) {
        return res.status(200).json({ message: 'User deleted successfully' });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

  public login :any= async (req: Request, res: Response): Promise<Response> => {  
    try {  
      const { email, password } = req.body;  

      const user = await this.userService.getUserByEmail(email);   
      if (!user) {  
        return res.status(401).json({ error: 'Invalid email or password' });  
      }  
      console.log(user, "<<, ini emailnya")

       
      const passwordIsValid = await bcrypt.compare(password, user.password);  
      if (!passwordIsValid) {  
        return res.status(401).json({ error: 'Invalid email or password' });  
      }  

      
      const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {  
        expiresIn: '1h', // Token expires in 1 hour  
      });  

      return res.status(200).json({ token });  
    } catch (error) {  
      console.error(error);  
      return res.status(500).json({ error: 'Something went wrong' });  
    }  
  };  
}

export default new UserController(); 
