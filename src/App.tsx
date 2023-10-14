import Card from "@components/Card";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import TodoList from "@components/TodoList";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main
      className="min-h-screen"
      // className="relative grid min-h-screen place-items-center gap-0 space-y-2 px-6"
    >
      <Navbar />

      <Card>
        <Header />

        <hr className="mt-4" />

        <TodoList />

        <hr className="mt-4" />

        <Footer />
      </Card>

      <Toaster position="top-right" />
    </main>
  );
};

export default App;
