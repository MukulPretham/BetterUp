async function checkStatus(url) {
    try {
        const res = await fetch(`https://${url}`)
        console.log(res.status)
        return res.status === 200
    } catch (err) {
        return false
    }
}

async function main(){
    const isOnline = await checkStatus("goocadscasgle.com")
    console.log("Online?", isOnline)
}

await main()



