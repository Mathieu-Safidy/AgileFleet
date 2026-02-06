import { createAsyncThunk } from '@reduxjs/toolkit';
import { IncidentDto, ReportData } from '../interfaces/reportinterface';

const API_URL = 'https://api.agilfleet.fr/report';

// export interface ReportData {
//   missionDate: string;
//   missionType: string;
//   departureTime: string;
//   arrivalTime: string;
//   startLocation: string;
//   endLocation: string;
//   distance: number;
//   fuelConsumed?: number;
//   hoursDriven: number;
//   observations?: string;
//   incidents?: IncidentDto[];
//   vehicleCondition?: string;
// }

export interface ReportFilters {
    driverId?: string;
    search?: string;
    status?: string;
    missionType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export const updateReport = createAsyncThunk(
    'reports/updateReports',
    async ({ id, data }: { id: string; data: Partial<ReportData> }, { getState, rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur mise à jour');
        }
    }
)

export const fetchReportById = createAsyncThunk(
    'reports/fetchById',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            //   const res = await axios.get(`${API_URL}/${id}`, getAuthHeader(getState));
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                }
            });
            
            console.log('===========fecth report by id=============');
            console.log(await res.clone().json());
            console.log('====================================');
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            return rejectWithValue(error.response?.data?.message || 'Rapport introuvable');
        }
    }
);

export const fetchReports = createAsyncThunk(
    'reports/fetchAll',
    async (filters: any = {}, { getState, rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value.toString());
                }
            });

            //   const res = await axios.get(`${API_URL}?${params.toString()}`, getAuthHeader(getState));

            const res = await fetch(`${API_URL}?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                }
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            // console.log('==============fetchin===============');
            // console.log(await res.clone().json());
            // console.log('====================================');
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur de chargement');
        }
    }
);


export const fetchDriverStats = createAsyncThunk(
    'reports/fetchDriverStats',
    async (_, { getState, rejectWithValue }) => {
        try {
            //   const res = await axios.get(`${API_URL}/driver/stats`, getAuthHeader(getState));
            const res = await fetch(`${API_URL}/driver/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                }
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur statistiques');
        }
    }
);

export const createReport = createAsyncThunk(
    'reports/create',
    async (reportData: ReportData, { getState, rejectWithValue }) => {
        try {
            //   const res = await axios.post(API_URL, reportData, getAuthHeader(getState));
            //   return res.data;
            const res = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                },
                body: JSON.stringify(reportData)
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur création');
        }
    }
);


// 6. Supprimer un rapport
export const deleteReport = createAsyncThunk(
    'reports/delete',
    async (id: string, { getState, rejectWithValue }) => {
        try {
            //   await axios.delete(`${API_URL}/${id}`, getAuthHeader(getState));
            //   return id;
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                }
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur suppression');
        }
    }
);

// 7. Uploader des documents
export const uploadDocuments = createAsyncThunk(
    'reports/uploadDocuments',
    async (
        { id, files }: { id: string; files: File[] },
        { getState, rejectWithValue }
    ) => {
        try {
            const formData = new FormData();
            files.forEach(file => formData.append('files', file));

            // const res = await axios.post(
            //     `${API_URL}/${id}/documents`,
            //     formData,
            //     {
            //         ...getAuthHeader(getState),
            //         headers: {
            //             ...getAuthHeader(getState).headers,
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     }
            // );
            // return res.data;
            const res = await fetch(`${API_URL}/${id}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur upload');
        }
    }
);

// 8. Supprimer un document
export const removeDocument = createAsyncThunk(
    'reports/removeDocument',
    async (
        { id, documentIndex }: { id: string; documentIndex: number },
        { getState, rejectWithValue }
    ) => {
        try {
            // const res = await axios.delete(
            //     `${API_URL}/${id}/documents/${documentIndex}`,
            //     getAuthHeader(getState)
            // );
            // return res.data;
            const res = await fetch(`${API_URL}/${id}/documents/${documentIndex}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                }
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur suppression document');
        }
    }
);

export const updateReportStatus = createAsyncThunk(
    'reports/updateStatus',
    async (
        { id, status, rejectionReason }: { id: string; status: string; rejectionReason?: string },
        { getState, rejectWithValue }
    ) => {
        try {
            //   const res = await axios.patch(
            //     `${API_URL}/${id}/status`,
            //     { status, rejectionReason },
            //     getAuthHeader(getState)
            //   );
            //   return res.data;

            const res = await fetch(`${API_URL}/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(getState() as any).auth.token}`,
                },
                body: JSON.stringify({ status, rejectionReason })
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur mise à jour');
            }
            return res.json();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur statut');
        }
    }
);

// export const updateReport = createAsyncThunk(
//   'reports/update',
//   async (
//     { id, data }: { id: string; data: Partial<ReportData> },
//     { getState, rejectWithValue }
//   ) => {
//     try {
//       const res = await axios.patch(`${API_URL}/${id}`, data, getAuthHeader(getState));
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Erreur mise à jour');
//     }
//   }
// );