import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import BlogScreen from "./screens/BlogScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersScreen from "./screens/UsersScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import BlogsScreen from "./screens/BlogsScreen";
import UpdateBlogScreen from "./screens/UpdateBlogScreen";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/blog/:slug" element={<BlogScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin/users" element={<UsersScreen />} />
          <Route path="admin/users/:id" element={<UpdateUserScreen />} />
          <Route path="/admin/blogs" element={<BlogsScreen />} />
          <Route
            path="/admin/blogs/update/:slug"
            element={<UpdateBlogScreen />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
