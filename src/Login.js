import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const submit = (e) => {
        if (e.key === 'Enter') {
            const password = e.target.value
            if (password === 'huqingl1'){
                navigate('/ThreeNums')
            }
            else {
                alert('wrong password!')
            }
        }
    }
    return (
        <div className="text-center h-screen flex justify-center flex-col items-center">
            <input placeholder="Enter your password" className="border border-[1px] outline-none p-2 rounded-md" onKeyDown={(e) => submit(e)} />
        </div>
    )
}
export default Login;