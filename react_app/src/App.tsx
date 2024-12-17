import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, PrivateRoute } from './shared/Shared.tsx';
import { Index } from "./Index.tsx";
import { About } from "./About.tsx";
import { Admin } from "./My/Admin.tsx";
import { AddAttendance, Attendance, TrainFR } from "./My/Attendance.tsx";
import { CreateDepartment, Department, UpdateDepartment } from "./My/Departments.tsx";
import { Permission } from "./My/Permissions.tsx";
import { Progress } from "./My/Progress.tsx";
import { AddRoles, GetMyRequests, GetRequests, RequestUserRole, Roles, UpdateRoles } from "./My/Roles.tsx";
import { SkillSet } from "./My/Skillset.tsx";
import { Skills } from "./My/Skills.tsx";
import { Login, Logout, Profile, Register, UpdateProfile, User } from "./My/User.tsx";
import { Notifications } from "./My/Notifications.tsx";
import PageNotFound from "./shared/NotFound.tsx";

function App() {
    return (
        <>
        <div className='w-full h-full flex flex-col'>
            <Router>
                <div className='w-auto h-1/12 px-2 py-2 flex bg-cyan-500 border border-solid border-black'><Header /></div>
                <div className='w-auto h-5/6 flex '>
                    <Routes>
                        <Route path="/" index element={<Index />} />
                        <Route path="About" element={<About />} />
                        <Route path="Admin" element={<Admin/>} />
                        <Route path="Attendance" element={<Attendance />} >
                            <Route path="Add" element={<AddAttendance/>} />
                            <Route path="Train" element={<TrainFR/>} />
                        </Route>
                        <Route path="Department" element={<Department />} >
                            <Route path="Create" element={<CreateDepartment />} /> 
                            <Route path="Update" element={<UpdateDepartment />} /> 
                        </Route>
                        <Route path="Permission" element={<Permission />} />
                        <Route path="Progress" element={<Progress />} />
                        <Route path="Roles" element={<Roles />} >
                            <Route path="Add" element={<AddRoles />}/>
                            <Route path="Update" element={<UpdateRoles />}/>
                            <Route path="CreateRequest" element={<RequestUserRole />}/>
                            <Route path="GetMyRequest" element={<GetMyRequests />}/>
                            <Route path="GetRequest" element={<GetRequests />}/>
                        </Route>
                        <Route path="Skills" element={<Skills />} >
                            <Route path="AddUserSkills" />
                            <Route path="UserSkills" />
                        </Route>
                        <Route path="Skillset" element={<SkillSet />} >
                            <Route path="AddSkillSet"/>
                            <Route path="UpdateSkillSet"/>
                            <Route path="AddSkills" />
                            <Route path="UpdateSkills" />
                        </Route>
                        <Route path="User" element={<User />} >
                            <Route path="Register" element={<Register />} />
                            <Route path="Login" element={<Login />} />
                            <Route path="Logout" element={<Logout />} />
                            <Route path="Profile" element={<PrivateRoute><Profile /> </PrivateRoute>} />
                            <Route path="UpdateProfile" element={<PrivateRoute><UpdateProfile /> </PrivateRoute>} />
                        </Route>
                        <Route path="Notifications" element={<Notifications />} />

                        <Route path='*' element={<PageNotFound />} />
                        
                    </Routes>
                </div>
                <div className='w-auto h-1/6 px-16 border border-t-2 border-black bg-black'><Footer/></div>
            </Router>
        </div>
        </>
    );
}

export default App;