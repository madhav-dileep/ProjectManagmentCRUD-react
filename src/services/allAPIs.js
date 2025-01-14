import commonAPI from './commonAPI'
import serverURL from './serverURL'

// Save Project Dets in server
export const saveProjectAPI = async (projectDetails) => {
    return await commonAPI("POST",`${serverURL}/uploadProject`,projectDetails)
}

// GEt project dets from server
export const getProjectAPI = async () => {
    return await commonAPI("GET",`${serverURL}/uploadProject`,"")
}

// delete projects from server
export const removeProjectAPI = async (id) => {
    return await commonAPI("DELETE",`${serverURL}/uploadProject/${id}`,{})
}

// add Member to server
export const addMemberAPI = async (projectMembers) => {
    return await commonAPI("POST",`${serverURL}/projectMembers`,projectMembers)
}

// getMemberAPI
export const getMemberAPI = async () => {
    return await commonAPI("GET",`${serverURL}/projectMembers`,"")
}

// delete member
export const removeMemberAPI = async (id) => {
    return await commonAPI("DELETE",`${serverURL}/projectMembers/${id}`,{})
}

// Update completeion Status
export const updateCompletionStatusAPI = async (projectForView) => {
    return await commonAPI("PUT",`${serverURL}/uploadProject/${projectForView.id}`,projectForView)
}
