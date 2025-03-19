import Navbar from "@/components/navbar";
import getCategories from "@/actions/get-categories";

const NavbarWrapper = async () => {
  const categories = await getCategories();

  return (
    <nav className="relative z-10">
      <Navbar categories={categories} />
    </nav>
  );
};

export default NavbarWrapper;
