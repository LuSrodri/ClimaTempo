export default async function isloggedin() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/usuarios/' + sessionStorage.getItem('id'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        });
        if (response.ok) return true;
        return false;
    }
    catch (e) {
        return false;
    }
}