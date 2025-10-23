import supabase from '../config/supabase.js';

// First step should be registering
export const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body; 

        const { data, error } =  await supabase.auth.admin.createUser({
            email, 
            password, 
            email_confirm: true, // True for by-passing testing emails, auto verified.
            user_metadata: { name },
        });

        if(error) throw error; 

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: data.user,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
};


// login karenge user ko
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: data.user,
      token: data.session.access_token,
    });


  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// logging out
export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Missing authorization token");

    // Supabase automatically knows which session to revoke
    const { error } = await supabase.auth.admin.signOut(token);
    // we had two options, Local and Remote logout, Remote seemed the best to me !

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Verify token and fetch user profile
export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Missing authorization token");

    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;

    res.status(200).json({
      success: true,
      user: data.user,
    });

  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// what if user finds my services sussy, del acc option hona chaiye
export const deleteUser = async (req, res) => {
    try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Missing authorization token");

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError) throw userError;
    const userId = userData.user.id;

    // delete user (this also triggers cascade delete on profiles and related tables)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
    if (deleteError) throw deleteError;

    res.status(200).json({ success: true, message: "User and all related data deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};