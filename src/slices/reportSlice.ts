import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createReport, deleteReport, fetchDriverStats, fetchReportById, fetchReports, removeDocument, ReportFilters, updateReport, updateReportStatus, uploadDocuments } from "../thunk/reportthunk";

interface ReportDocument {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
}

// Interface pour les incidents
interface ReportIncident {
  id: number;
  description: string;
  time: string;
  type: 'accident' | 'panne' | 'retard' | 'autre';
}

// Interface pour un rapport
export interface Report {
  id: string;
  reportId: string;
  missionDate: string;
  missionType: string;
  departureTime: string;
  arrivalTime: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  fuelConsumed?: number;
  hoursDriven: number;
  observations?: string;
  vehicle?: any;
  status: 'en attente' | 'soumis' | 'validé' | 'rejeté';
  incidents?: ReportIncident[];
  documents?: ReportDocument[];
  vehicleCondition?: string;
  rejectionReason?: string;
  validatedById?: string;
  driverId: string;
  createdAt: string;
  updatedAt: string;
  submittedAt: string;
  validatedAt?: string;
}

// Interface pour les statistiques
interface DriverStats {
  total: number;
  validated: number;
  submitted: number;
  pending: number;
  rejected: number;
}

// Interface pour la réponse paginée
interface ReportsResponse {
  reports: Report[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// État initial
interface ReportsState {
  // Liste paginée
  liste: Report[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  
  // Filtres courants
  filters: ReportFilters;
  
  // Rapport sélectionné
  currentReport: Report | null;
  
  // Statistiques
  stats: DriverStats | null;
  
  // États de chargement
  loading: boolean;
  loadingStats: boolean;
  loadingReport: boolean;
  
  // Erreurs
  error: string | null;
  statsError: string | null;
  reportError: string | null;
}

const initialState: ReportsState = {
  liste: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  filters: {},
  currentReport: null,
  stats: null,
  loading: false,
  loadingStats: false,
  loadingReport: false,
  error: null,
  statsError: null,
  reportError: null,
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.statsError = null;
      state.reportError = null;
    },
    setFilters: (state, action: PayloadAction<ReportFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setPagination: (state, action: PayloadAction<{ page?: number; limit?: number }>) => {
      if (action.payload.page !== undefined) state.page = action.payload.page;
      if (action.payload.limit !== undefined) state.limit = action.payload.limit;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL REPORTS
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReports.fulfilled,
        (state, action: PayloadAction<ReportsResponse>) => {
          state.loading = false;
          state.liste = action.payload.reports;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchReports.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors du chargement des rapports';
      })

      // FETCH DRIVER STATS
      .addCase(fetchDriverStats.pending, (state) => {
        state.loadingStats = true;
        state.statsError = null;
      })
      .addCase(
        fetchDriverStats.fulfilled,
        (state, action: PayloadAction<DriverStats>) => {
          state.loadingStats = false;
          state.stats = action.payload;
        }
      )
      .addCase(fetchDriverStats.rejected, (state, action: any) => {
        state.loadingStats = false;
        state.statsError = action.payload || 'Erreur lors du chargement des statistiques';
      })

      // FETCH REPORT BY ID
      .addCase(fetchReportById.pending, (state) => {
        state.loadingReport = true;
        state.reportError = null;
      })
      .addCase(
        fetchReportById.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loadingReport = false;
          state.currentReport = action.payload;
        }
      )
      .addCase(fetchReportById.rejected, (state, action: any) => {
        state.loadingReport = false;
        state.reportError = action.payload || 'Erreur lors du chargement du rapport';
      })

      // CREATE REPORT
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createReport.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = false;
          state.liste.unshift(action.payload);
          state.total += 1;
          
          // Mettre à jour les stats si disponibles
          if (state.stats) {
            state.stats.total += 1;
            state.stats.submitted += 1;
          }
        }
      )
      .addCase(createReport.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la création du rapport';
      })

      // UPDATE REPORT
      .addCase(updateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateReport.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = false;
          const index = state.liste.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) {
            state.liste[index] = action.payload;
          }
          
          // Mettre à jour le rapport courant s'il est concerné
          if (state.currentReport?.id === action.payload.id) {
            state.currentReport = action.payload;
          }
        }
      )
      .addCase(updateReport.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la mise à jour du rapport';
      })

      // UPDATE REPORT STATUS
      .addCase(updateReportStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateReportStatus.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = false;
          const index = state.liste.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) {
            state.liste[index] = action.payload;
          }
          
          // Mettre à jour le rapport courant s'il est concerné
          if (state.currentReport?.id === action.payload.id) {
            state.currentReport = action.payload;
          }
          
          // Mettre à jour les stats si disponibles
          if (state.stats) {
            const oldStatus = state.liste[index]?.status;
            const newStatus = action.payload.status;
            
            // Décrémenter l'ancien statut
            if (oldStatus === 'validé') state.stats.validated -= 1;
            else if (oldStatus === 'soumis') state.stats.submitted -= 1;
            else if (oldStatus === 'en attente') state.stats.pending -= 1;
            else if (oldStatus === 'rejeté') state.stats.rejected -= 1;
            
            // Incrémenter le nouveau statut
            if (newStatus === 'validé') state.stats.validated += 1;
            else if (newStatus === 'soumis') state.stats.submitted += 1;
            else if (newStatus === 'en attente') state.stats.pending += 1;
            else if (newStatus === 'rejeté') state.stats.rejected += 1;
          }
        }
      )
      .addCase(updateReportStatus.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la mise à jour du statut';
      })

      // DELETE REPORT
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteReport.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.liste = state.liste.filter((r) => r.id !== action.payload);
          state.total -= 1;
          
          // Mettre à jour les stats si disponibles
          if (state.stats) {
            const deletedReport = state.liste.find((r) => r.id === action.payload);
            if (deletedReport) {
              state.stats.total -= 1;
              if (deletedReport.status === 'validé') state.stats.validated -= 1;
              else if (deletedReport.status === 'soumis') state.stats.submitted -= 1;
              else if (deletedReport.status === 'en attente') state.stats.pending -= 1;
              else if (deletedReport.status === 'rejeté') state.stats.rejected -= 1;
            }
          }
          
          // Effacer le rapport courant s'il a été supprimé
          if (state.currentReport?.id === action.payload) {
            state.currentReport = null;
          }
        }
      )
      .addCase(deleteReport.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la suppression du rapport';
      })

      // UPLOAD DOCUMENTS
      .addCase(uploadDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        uploadDocuments.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = false;
          const index = state.liste.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) {
            state.liste[index] = action.payload;
          }
          
          if (state.currentReport?.id === action.payload.id) {
            state.currentReport = action.payload;
          }
        }
      )
      .addCase(uploadDocuments.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de l\'upload des documents';
      })

      // REMOVE DOCUMENT
      .addCase(removeDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeDocument.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = false;
          const index = state.liste.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) {
            state.liste[index] = action.payload;
          }
          
          if (state.currentReport?.id === action.payload.id) {
            state.currentReport = action.payload;
          }
        }
      )
      .addCase(removeDocument.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la suppression du document';
      });
  },
});

export const { clearError, setFilters, clearFilters, setPagination, clearCurrentReport } = reportSlice.actions;
export default reportSlice;