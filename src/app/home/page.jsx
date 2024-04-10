import MainLayout from "../components/globals/MainLayout";
import Library from "../components/content/Library";

const HomeRoute = (props) => {
  return (
    <MainLayout>
      <Library {...props} />
    </MainLayout>
  );
};
export default HomeRoute;
