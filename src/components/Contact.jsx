import '../Contact.css'
import {useEffect, useState} from "react";
import {base_url, field, period_month, text} from "../utils/constants.js";

const Contact = () => {
    const [planets, setPlanets] = useState(['wait...']);

    async function fillPlanets(url) {
        const response = await fetch(url);
        const data = await response.json();
        const planets = data.map(item => item.name);
        setPlanets(planets);
        localStorage.setItem('planets', JSON.stringify({
            payload: planets,
            time: Date.now()
        }));
    }

    useEffect(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && ((Date.now() - planets.time) < period_month)) {
            setPlanets(planets.payload);
        } else {
            fillPlanets(`${base_url}/v1/planets`);
        }
    }, [])

    return (
        <form className={'bg-gray-100 rounded-md p-5 mr-16 ml-16'} onSubmit={e => {
            e.preventDefault();
        }}>
            <label className={text}>First Name
                <input className={field} name="firstname" placeholder="Your name.."/>
            </label>
            <label className={text}>Last Name
                <input className={field} name="lastname" placeholder="Your last name.."/>
            </label>
            <label className={text}>Planet
                <select name="planet"
                        className={field}>
                    {planets.map(item => <option value={item} key={item}>{item}</option>)}
                </select>
            </label>

            <label className={text}>Subject
                <textarea name="subject" placeholder="Write something.." className={field} rows="5"></textarea>
            </label>
            <button type="submit" className={'bg-[#04AA6D] text-white p-3 mt-4 rounded-md  cursor-pointer hover:bg-[#45a049]'}>Submit</button>
        </form>
    )
};

export default Contact;