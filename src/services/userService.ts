import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  private prisma: PrismaClient;  
  private jwtSecret: string; 

  constructor() {  
    this.prisma = new PrismaClient();  
    this.jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; 
  }  
  public createUser = async (data: {
    email: string;
    password: string;
    namaLengkap?: string;
    nomorHandphone?: string;
    alamat?: string;
  }): Promise<User> => {
    const { email, password, namaLengkap, nomorHandphone, alamat } = data;

    return this.prisma.user.create({
      data: {
        email,
        password,
        namaLengkap,
        nomorHandphone,
        alamat,
      },
    });
  };

  public getAllUsers = async (): Promise<User[]> => {
    return this.prisma.user.findMany();
  };

  public getUserById = async (id: number): Promise<User | null> => {
    return this.prisma.user.findFirst({
      where: { id },
    });
  };

  // Fungsi untuk memperbarui data user
  public updateUser = async (
    id: number,
    data: {
      email?: string;
      password?: string;
      namaLengkap?: string;
      nomorHandphone?: string;
      alamat?: string;
    }
  ): Promise<User | null> => {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  };

  public deleteUser = async (id: number): Promise<User | null> => {
    return this.prisma.user.delete({
      where: { id },
    });
  };

  public getUserByEmail = async (email: string): Promise<User | null> => {  
    return this.prisma.user.findUnique({
        where: { email },
    });
};

  public login = async (email: string, password: string): Promise<string | null> => {  
    const user = await this.prisma.user.findFirst({  
      where: { email },  
    });  
  
    if (user && (await bcrypt.compare(password, user.password))) {  
        
      const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {  
        expiresIn: '10h', 
      });  
      return token;  
    }  
    return null;  
  }; 
}



export default UserService;
