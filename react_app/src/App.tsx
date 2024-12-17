import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, PrivateRoute } from './shared/Shared.tsx';
import { Index } from "./Index.tsx";
import { About } from "./About.tsx";
import { Admin } from "./My/Admin.tsx";
import { AddAttendance, Attendance, TrainFR } from "./My/Attendance.tsx";
import { CreateDepartment, Department, UpdateDepartment } from "./My/Departments.tsx";
import { Permission } from "./My/Permissions.tsx";
import { Progress } from "./My/Progress.tsx";
import { AddRoles, GetMyRequests, GetRequests, MyRoles, ReadRoles, Roles, SetUserRole, UpdateRoles } from "./My/Roles.tsx";
import { AddSkill, AddSkillSet, DeleteSkill, DeleteSkillSet, SkillSet, UpdateSkill, UpdateSkillSet } from "./My/Skillset.tsx";
import { AddUserSkill, Skills, UpdateUserSkill } from "./My/Skills.tsx";
import { Login, Logout, Profile, Register, UpdatePassword, UpdateProfile, User } from "./My/User.tsx";
import { Notifications } from "./My/Notifications.tsx";
import PageNotFound from "./shared/NotFound.tsx";

export const outer_div = "py-4 w-1/2 justify-items-center rounded-xl bg-blue-500"
export const inner_form = "w-4/6 px-2 py-2 border border-black rounded-xl flex flex-col"
export const input_text = "p-2 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
export const submit = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

function App() {
    return (
        <>
        <div className='w-full h-full flex flex-col'>
            <Router>
                <div className='w-auto h-1/12 px-2 py-2 flex bg-cyan-400 border border-solid border-black'><Header /></div>
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
                            <Route path="Read" element={<ReadRoles />}/>
                            <Route path="Update" element={<UpdateRoles />}/>
                            <Route path="SetUserRole" element={<SetUserRole />}/>
                            <Route path="GetMyRequests" element={<GetMyRequests />}/>
                            <Route path="GetRequests" element={<GetRequests />}/>
                        </Route>
                        <Route path="Skills" element={<Skills />} >
                            <Route path="Add"  element={<AddUserSkill />}/>
                            <Route path="Update"  element={<UpdateUserSkill />}/>
                        </Route>
                        <Route path="Skillset" element={<SkillSet />} >
                            <Route path="Add" element={<AddSkillSet />} />
                            <Route path="Update" element={<UpdateSkillSet/>} />
                            <Route path="Skills" >
                                <Route path="Add" element={<AddSkill/>} />
                                <Route path="Update" element={<UpdateSkill/>} />
                            </Route>
                        </Route>
                        <Route path="User" element={<User />} >
                            <Route path="Register" element={<Register />} />
                            <Route path="Login" element={<Login />} />
                            <Route path="Logout" element={<Logout />} />
                            <Route path="Profile" element={<PrivateRoute><Profile /> </PrivateRoute>} />
                            <Route path="UpdateProfile" element={<PrivateRoute><UpdateProfile /> </PrivateRoute>} />
                            <Route path="UpdatePassword" element={<PrivateRoute><UpdatePassword /> </PrivateRoute>} />
                            <Route path="Roles">

                            </Route>
                            <Route path="Skills">

                            </Route>
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