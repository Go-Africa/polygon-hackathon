export class User {
    identifiedUser?: boolean
    active?: boolean
    activeAccountToken?: string
    addresse?: any
    birthDate?: string
    childUser?: any
    cni?: string
    currency?: string
    email?: string
    id?: number
    location?: string
    name?: string
    pack?: Pack
    parentUser?: any
    password?: string
    repassword?: string
    pays?: string
    profilePicture?: string
    refferedUser?: string
    resetToken?: string
    roles?: Role[]
    tel?: string
    username?: string
    ville?: string
    solde?: number
}


export class Role {
    id?: number
    role?: string
}

export class Pack {
    dateDabut?: string
    dateFin?: string
    description?: string
    id?: number
    libelle?: string
    montantCible?: number
    nbreGeneration?: number
    tauFCFAiiliation?: string
    valuerNorminale?: number
}

export class Wallet {
    appUser?: User
    dateCreation?: string
    id?: number
    solde?: number
}

export class Versement {
    date?: string
    id?: number
    mode?: string
    montant?: number
    raison?: string
    wallet?: Wallet
}
