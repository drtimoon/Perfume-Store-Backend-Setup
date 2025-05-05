const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    authType: { 
      type: String, 
      enum: ['email', 'google', 'apple', 'phone'],
      required: true 
    },
    authId: String, // For social logins
    passwordHash: String, // Only for email auth
    otp: { 
      code: String,
      expiresAt: Date 
    },
    roles: { 
      type: [String], 
      default: ['customer'],
      enum: ['customer', 'admin'] 
    }
  }, { timestamps: true });