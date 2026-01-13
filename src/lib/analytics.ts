type AnalyticsData = {
    pageViews: number;
    sectionViews: Record<string, number>;
    visitors: number;
    locations: string[];
    devices: Record<string, number>;
};

const INITIAL_DATA: AnalyticsData = {
    pageViews: 0,
    sectionViews: {},
    visitors: 0,
    locations: [],
    devices: {
        Desktop: 0,
        Mobile: 0,
        Tablet: 0,
    },
};

export const trackPageView = (path: string) => {
    const data = getAnalyticsData();
    data.pageViews += 1;
    saveAnalyticsData(data);
};

export const trackSectionView = (sectionId: string) => {
    const data = getAnalyticsData();
    data.sectionViews[sectionId] = (data.sectionViews[sectionId] || 0) + 1;
    saveAnalyticsData(data);
};

export const trackVisitor = () => {
    const data = getAnalyticsData();
    const visitorId = localStorage.getItem('visitor_id');

    if (!visitorId) {
        const newId = Math.random().toString(36).substring(7);
        localStorage.setItem('visitor_id', newId);
        data.visitors += 1;

        // Detect device
        const width = window.innerWidth;
        if (width < 768) data.devices.Mobile += 1;
        else if (width < 1024) data.devices.Tablet += 1;
        else data.devices.Desktop += 1;

        saveAnalyticsData(data);
    }
};

export const getAnalyticsData = (): AnalyticsData => {
    const stored = localStorage.getItem('portfolio_analytics');
    if (stored) {
        return JSON.parse(stored);
    }
    return INITIAL_DATA;
};

const saveAnalyticsData = (data: AnalyticsData) => {
    localStorage.setItem('portfolio_analytics', JSON.stringify(data));
};

// Initialize tracking
if (typeof window !== 'undefined') {
    trackVisitor();
}
