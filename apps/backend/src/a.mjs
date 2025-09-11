import axios from "axios"

async function checkStatus(url) {
    try {
        const res = await axios.get(`https://${url}`, {
            timeout: 5000 // optional: fail if no response in 5 seconds
        });
        console.log(res.status)
        return res.status === 200
    } catch (err) {
        return false
    }
}

async function main(){
    const isOnline = await checkStatus("facebook.com")
    console.log("Online?", isOnline)
}

await main()



