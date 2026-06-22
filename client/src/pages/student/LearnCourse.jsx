import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import api from "../../services/api";
import { setSelectedCourse } from "../../redux/slices/courseSlice";
import { setLectures, setCurrentLecture } from "../../redux/slices/lectureSlice";

import { Play, ArrowLeft, ArrowRight, CheckSquare, Square, AlertCircle, HelpCircle } from "lucide-react";
import { toast } from "react-toastify";

const LearnCourse = () => {
  const courseId = window.location.pathname.split("/")[2];
  const dispatch = useDispatch(); 

  const course = useSelector((state) => state.course.selectedCourse);
  const lectures = useSelector((state) => state.lecture.lectures);
  const currentLecture = useSelector((state) => state.lecture.currentLecture);

  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [completedLessons, setCompletedLessons] = useState(() => {
    const savedProgress = localStorage.getItem(`progress_${courseId}`);
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/courses/${courseId}/learn`);
        const data = response.data;

        if (data && data.success) {
          dispatch(setSelectedCourse(data.course));
          
          const lectureList = data.course.lectures || [];
          dispatch(setLectures(lectureList));

          if (lectureList.length > 0) {
            const validIds = lectureList.map((lec) => lec._id);
            setCompletedLessons((prev) => prev.filter((id) => validIds.includes(id)));

            setCurrentLectureIndex(0);
            dispatch(setCurrentLecture(lectureList[0]));
          } else {
            setCompletedLessons([]);
            dispatch(setCurrentLecture(null));
          }
        } else {
          toast.error("Failed to resolve course content.");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("An error occurred while connecting to the server.");
        setError(error.response?.data?.message || "An error occurred while connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }

    return () => {
      dispatch(setSelectedCourse(null));
      dispatch(setLectures([]));
      dispatch(setCurrentLecture(null));
    };
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseId) {
      localStorage.setItem(`progress_${courseId}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, courseId]);

  const changeActiveLecture = (index) => {
    if (!lectures || !lectures[index]) return;
    setCurrentLectureIndex(index);
    dispatch(setCurrentLecture(lectures[index]));
  };

  const toggleLessonCompletion = (lectureId) => {
    setCompletedLessons((prev) =>
      prev.includes(lectureId) ? prev : [...prev, lectureId] 
    );
  };

  const handleNext = () => {
    if (lectures && currentLectureIndex < lectures.length - 1) {
      changeActiveLecture(currentLectureIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLectureIndex > 0) {
      changeActiveLecture(currentLectureIndex - 1);
    }
  };

  const totalLessons = lectures?.length || 0;
  const completedLessonsCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 
    ? Math.round((completedLessonsCount / totalLessons) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700 font-semibold text-lg animate-pulse">Preparing your classroom...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4 bg-white pt-10">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full text-center border border-gray-200 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">Access Restrained</h2>
          <p className="text-gray-500 text-sm mb-5">{error || "The requested course catalog cannot be located."}</p>
          <button
            onClick={() => window.history.back()}
            className="text-white px-4 py-2 rounded-lg cursor-pointer transition-all hover:brightness-95 w-full font-medium"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white font-sans flex flex-col lg:flex-row pt-10 overflow-hidden">
      
      <div
        className="w-full lg:w-[68%] p-2 md:p-5 flex flex-col space-y-6 overflow-y-auto h-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="border border-gray-300 rounded-xl py-2 px-5 shadow-xs flex flex-col bg-white shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>

          <div className="relative w-full aspect-video rounded-lg bg-[#E0E0E0] overflow-hidden mb-2">
            {currentLecture ? (
              <video
                key={currentLecture._id}
                src={currentLecture.videoUrl}
                controls
                onEnded={() => toggleLessonCompletion(currentLecture._id)}
                className="w-full h-full object-contain"
                poster={course.thumbnail}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-center p-6">
                <HelpCircle className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-600 font-bold text-lg">No Streaming Media Available</p>
              </div>
            )}
          </div>

          <div className="mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {currentLecture ? currentLecture.title : "Lesson Title Unavailable"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {currentLecture?.duration || "Timeline metadata configurations unassigned."}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <button
              onClick={handlePrevious}
              disabled={currentLectureIndex === 0 || !lectures || lectures.length === 0}
              className="flex items-center border border-gray-400 text-gray-700 font-medium px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!lectures || currentLectureIndex === lectures.length - 1 || lectures.length === 0}
              style={{ backgroundColor: "var(--color-primary)" }}
              className="flex items-center text-white font-medium px-2 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              Next <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:mr-2 shrink-0" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 shrink-0">
          {lectures && lectures.slice(currentLectureIndex + 1, currentLectureIndex + 4).map((lecture, index) => (
            <button
              key={lecture._id || index}
              onClick={() => changeActiveLecture(currentLectureIndex + 1 + index)}
              className="border border-gray-300 rounded-xl p-4 flex flex-col bg-white text-left cursor-pointer hover:shadow-xs transition-all group"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#D1D5DB"}
            >
              <div className="w-full aspect-video rounded-lg mb-3 flex items-center justify-center relative overflow-hidden bg-black">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={lecture.title} className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-gray-700 bg-white/90 px-2 py-0.5 rounded-md absolute top-2 left-2 z-10">
                  Up Next
                </span>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/90 p-2.5 rounded-full shadow-md">
                    <Play className="w-4 h-4 fill-current" style={{ color: "var(--color-primary)" }} />
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-primary">{lecture.title}</h3>
              <p className="text-gray-400 text-xs mt-1 font-semibold">{lecture.duration || "Duration unassigned"}</p>
            </button>
          ))}
          {(!lectures || lectures.slice(currentLectureIndex + 1, currentLectureIndex + 4).length === 0) && (
            <div className="col-span-1 sm:col-span-3 text-center py-8 text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl font-medium bg-gray-50/50">
               You have reached the final segment of this course track!
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[32%] bg-[#F4ECF8] border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col shrink-0 lg:h-full lg:sticky lg:top-14">
        
        <div className="hidden lg:flex p-4 items-center justify-between border-b border-gray-200 bg-[#F4ECF8] shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
          <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{lectures?.length || 0} Lessons</span>
        </div>

        <div className="hidden lg:block flex-1 overflow-y-auto divide-y divide-gray-300 bg-[#F4ECF8]">
          {!lectures || lectures.length === 0 ? (
            <div className="p-6 text-center text-sm font-medium text-gray-400">
              Syllabus schedule mapping empty.
            </div>
          ) : (
            lectures.map((lecture, index) => {
              const isActive = currentLectureIndex === index;
              const isLectureCompleted = completedLessons.includes(lecture._id);

              return (
                <div
                  key={lecture._id}
                  className={`w-full flex items-start p-4 transition-all text-left border-l-4 ${
                    isActive ? "bg-white" : "bg-transparent hover:bg-white/40"
                  }`}
                  style={{ borderLeftColor: isActive ? "var(--color-primary)" : "transparent" }}
                >
                  <button 
                    onClick={() => changeActiveLecture(index)}
                    className="flex flex-1 items-start text-left cursor-pointer min-w-0 pr-2"
                  >
                    <div className="mr-3 mt-1 shrink-0">
                      <Play className="w-4 h-4 fill-current" style={{ color: "var(--color-primary)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-base truncate transition-all ${
                        isLectureCompleted && !isActive ? "text-gray-400 line-through font-medium" : "text-gray-900"
                      }`}>
                        {lecture.title || `Lesson ${index + 1}`}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">
                        {lecture.duration || "Duration unassigned"}
                      </p>
                    </div>
                  </button>

                  <div className="shrink-0 mt-1 select-none">
                    {isLectureCompleted ? (
                      <CheckSquare className="w-5 h-5 " style={{ color: "var(--color-primary)", backgroundColor: "white", borderRadius: "4px" }} />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 bg-white rounded-md" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 sm:p-5 border-t border-gray-300 bg-[#F4ECF8] shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Your progress</span>
            <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{progressPercentage}% complete</span>
          </div>
          
          <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden mb-1 sm:mb-3">
            <div style={{ backgroundColor: "var(--color-primary)", width: `${progressPercentage}%` }} className="h-full transition-all duration-300" />
          </div>
          
          <p className="text-xs text-gray-500 font-medium hidden sm:block">
            Completed {completedLessonsCount} of {totalLessons} lessons
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default LearnCourse;