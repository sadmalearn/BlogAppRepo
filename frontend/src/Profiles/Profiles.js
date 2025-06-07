export const ApiProfile = {
    Dev: 'http://localhost:3000/api/', 
    Test: 'https://blogapprepo.onrender.com',
    UAT: '',
    Prod: ''
}

export const getActivProfile = (profile) => {
    switch (profile) {
        case 'Dev': return (ApiProfile.Dev);
        case 'Test': return (ApiProfile.Test);
        case 'UAT': return (ApiProfile.UAT);
        case 'Prod': return (ApiProfile.Prod);
        default: return (ApiProfile.Dev);
    }
}
