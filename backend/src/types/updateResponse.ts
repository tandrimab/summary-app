export type Employee = {
    id: number;
    name: string;
    employeeId: string;
    email: string;
    joiningDate: string;
    designation: string;
    location: string;
    timezone: string;
    reportingToId: number;
    profileUrl: string;
    organisationId: string;
    isActive: boolean;
    removalDate: string | null;
    addedDate: string;
    currentlyExempted: boolean;
    employeeOfficeLocationId: number;
    gender: "MALE" | "FEMALE";
    googleToken: string | null;
    licenseId: string;
    authTenantUserId: string;
    taskUserId: string | null;
    isUserFirstLogin: boolean;
    biometricId: string;
    techStack: string | null;
};

export type Leave = {
    leave: string;
    leaveType: string;
    status: string;
    reason: string;
};

export type UpdateEntry = {
    employee: Employee;
    update: string | null;
    leaves: Leave[] | null;
    isExempted: boolean;
    officeLocation: string;
    holiday: string | null;
    exempted: boolean;
};

export type DataEntry = {
    date: string;
    occassion: string | null;
    updates: UpdateEntry[];
    releaseNotes: string[];
    meeting: string[];
};

export type ApiResponse = {
    data: DataEntry[];
};
