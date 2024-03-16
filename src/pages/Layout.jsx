import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <a
              href="/"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <li>
                <span className="ms-3">Campaign</span>
              </li>
            </a>
            <a
              href="/survey"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <li>
                <span className="ms-3">Survey</span>
              </li>
            </a>
            <a
              href="/field"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <li>
                <span className="ms-3">Field</span>
              </li>
            </a>
            <a
              href="/response"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
            >
              <li>
                <span className="ms-3">Response</span>
              </li>
            </a>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
