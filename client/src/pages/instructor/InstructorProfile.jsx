import { useSelector } from "react-redux";
import { User, Mail, ShieldCheck, BookOpen } from "lucide-react";

const InstructorProfile = () => {
  const { user } = useSelector((state) => state.auth);
   const { myCourses } = useSelector((state) => state.course);

  const totalStudents = myCourses?.reduce(
    (total, course) =>
      total + (course.enrolledStudents?.length || 0),
    0
  );
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="h-32 bg-primary"></div>

          <div className="px-6 pb-8">
            <div className="-mt-14 flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                <User size={50} className="text-primary" />
              </div>

              <h1 className="mt-4 text-3xl font-bold text-primary">
                {user?.name}
              </h1>

              <span className="mt-2 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                {user?.role}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <div className="bg-background rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={20} className="text-primary" />
                  <h3 className="font-semibold text-primary">Email Address</h3>
                </div>

                <p className="text-gray-700 break-all">{user?.email}</p>
              </div>

              <div className="bg-background rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={20} className="text-primary" />
                  <h3 className="font-semibold text-primary">Role</h3>
                </div>

                <p className="text-gray-700 capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-primary mb-4">
                Instructor Overview
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-primary" />
                    <div>
                      <p className="text-gray-500 text-sm">My Created Courses</p>

                      <h3 className="text-2xl font-bold text-primary">{myCourses?.length || 0}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <User className="text-primary" />
                    <div>
                      <p className="text-gray-500 text-sm">Enrolled Students in My Created Courses</p>

                      <h3 className="text-2xl font-bold text-primary">{totalStudents}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
