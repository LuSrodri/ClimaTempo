export default async function isloggedin() {
    try {
        const response = await fetch('http://localhost:3001/usuarios/' + sessionStorage.getItem('id'), {
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