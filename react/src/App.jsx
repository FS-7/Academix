import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './shared/Layout.jsx';
import { Index } from "./Index.jsx";
import { About, Devs } from "./About.jsx";
import { AddAttendance, Attendance, TrainFR } from "./components/Attendance.jsx";
import { CreateDepartment, Department, UpdateDepartment } from "./components/Departments.jsx";
import { AddPermission, Permission } from "./components/Permissions.jsx";
import { Register as RegisterProject, Status, Project } from "./components/Project.jsx";
import { AddRoles, Roles,  UpdateRoles } from "./components/Roles.jsx";
import { AddSkill, AddSkillSet, SkillSet, UpdateSkill, UpdateSkillSet } from "./components/Skillset.jsx";
import { AddUserSkill } from "./components/Skills.jsx";
import { Login, Logout, Profile, Register, UpdatePassword, UpdateProfile, User, GetMyRequests, GetRequests, SetUserRole } from "./components/User.jsx";
import PageNotFound from "./shared/NotFound.jsx";

export const outer_div = "py-4 w-1/2 justify-items-center rounded-xl bg-blue-500"
export const inner_form = "w-4/6 px-2 py-2 border border-black rounded-xl flex flex-col"
export const input_text = "p-2 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
export const submit = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

function App() {
    return (
        <>
        <div className='w-full h-full flex flex-col'>
            <Router>
                <div className='w-auto h-1/12 px-2 py-2 flex bg-cyan-400 border border-solid border-black'>
                    <Header />
                </div>
                <div className='w-auto h-5/6 flex grow'>
                    <Routes>
                        <Route path="/" index element={<Index />} />
                        <Route path="About" element={<About />}>
                            <Route path="College" element={null}/>
                            <Route path="Principal" element={null}/>
                            <Route path="HODs" element={null}/>
                            <Route path="Professors" element={null}/>
                            <Route path="Developers" element={<Devs />}/>
                        </Route>
                            
                        <Route path="Register" element={<Register />} />
                        <Route path="Login" element={<Login />} />
                        <Route path="Logout" element={<Logout />} />
                        
                        <Route path="Attendance" element={<Attendance />} >
                            <Route path="Add" element={<AddAttendance/>} />
                            <Route path="Train" element={<TrainFR/>} />
                        </Route>
                        <Route path="Department" element={<Department />} >
                            <Route path="Create" element={<CreateDepartment />} /> 
                            <Route path="Update" element={<UpdateDepartment />} /> 
                        </Route>
                        <Route path="Permissions" element={<Permission />} >
                            <Route path="Add" element={<AddPermission />} />
                        </Route>
                        <Route path="Project" element={<Project />} >
                            <Route path="Register" element={<RegisterProject/>} />
                            <Route path="Status" element={<Status />} />
                        </Route>
                        <Route path="Roles" element={<Roles />} >
                            <Route path="Add" element={<AddRoles />}/>
                            <Route path="Update" element={<UpdateRoles />}/>
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
                            <Route path="" element={<Profile />} />
                            <Route path="UpdateProfile" element={<UpdateProfile />} />
                            <Route path="UpdatePassword" element={<UpdatePassword />} />
                            <Route path="Roles">
                                <Route path="SetUserRole" element={<SetUserRole />}/>
                                <Route path="GetMyRequests" element={<GetMyRequests />}/>
                                <Route path="GetRequests" element={<GetRequests />}/>
                            </Route>
                            <Route path="Skills" >
                                <Route path="Add"  element={<AddUserSkill />}/>
                            </Route>
                            
                        </Route>

                        <Route path='*' element={<PageNotFound />} />
                        
                    </Routes>
                </div>
            </Router>
        </div>
        </>
    );
}

export default App;