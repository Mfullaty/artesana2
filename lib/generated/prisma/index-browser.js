
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  password: 'password',
  role: 'role'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  origin: 'origin',
  moisture: 'moisture',
  color: 'color',
  form: 'form',
  cultivation: 'cultivation',
  cultivationType: 'cultivationType',
  purity: 'purity',
  grades: 'grades',
  admixture: 'admixture',
  defection: 'defection',
  measurement: 'measurement',
  images: 'images',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuoteScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  fullName: 'fullName',
  email: 'email',
  phone: 'phone',
  companyName: 'companyName',
  website: 'website',
  needFor: 'needFor',
  product: 'product',
  productType: 'productType',
  cultivationType: 'cultivationType',
  processing: 'processing',
  unit: 'unit',
  volume: 'volume',
  purchaseType: 'purchaseType',
  deliveryAddress: 'deliveryAddress',
  incoterm: 'incoterm',
  deliveryDate: 'deliveryDate',
  deliveryFrequency: 'deliveryFrequency',
  additionalInfo: 'additionalInfo',
  status: 'status',
  files: 'files'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  message: 'message',
  sentOn: 'sentOn',
  status: 'status'
};

exports.Prisma.ReplyScalarFieldEnum = {
  id: 'id',
  content: 'content',
  sentOn: 'sentOn',
  isAdmin: 'isAdmin',
  messageId: 'messageId'
};

exports.Prisma.GeneralSettingsScalarFieldEnum = {
  id: 'id',
  heroText: 'heroText',
  tagLineText: 'tagLineText',
  aboutUsText: 'aboutUsText',
  missionStatement: 'missionStatement',
  productsHeroTitle: 'productsHeroTitle'
};

exports.Prisma.SiteSettingsScalarFieldEnum = {
  id: 'id',
  siteName: 'siteName',
  siteDescription: 'siteDescription',
  logo: 'logo',
  favicon: 'favicon',
  facebookLink: 'facebookLink',
  twitterLink: 'twitterLink',
  instagramLink: 'instagramLink',
  linkedinLink: 'linkedinLink',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  address: 'address'
};

exports.Prisma.ThemeSettingsScalarFieldEnum = {
  id: 'id',
  themeChoice: 'themeChoice',
  primaryColor: 'primaryColor',
  secondaryColor: 'secondaryColor',
  accentColor: 'accentColor',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  isDarkMode: 'isDarkMode',
  buttonStyle: 'buttonStyle',
  headerStyle: 'headerStyle',
  templateChoise: 'templateChoise'
};

exports.Prisma.EmailSubscriptionScalarFieldEnum = {
  id: 'id',
  email: 'email',
  ip: 'ip',
  submittedOn: 'submittedOn'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.UserRole = exports.$Enums.UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  CMO: 'CMO',
  USER: 'USER'
};

exports.Template = exports.$Enums.Template = {
  DEFAULT: 'DEFAULT',
  TEMPLATEA: 'TEMPLATEA',
  TEMPLATEB: 'TEMPLATEB',
  TEMPLATEC: 'TEMPLATEC'
};

exports.Prisma.ModelName = {
  Account: 'Account',
  User: 'User',
  VerificationToken: 'VerificationToken',
  Product: 'Product',
  Quote: 'Quote',
  Message: 'Message',
  Reply: 'Reply',
  GeneralSettings: 'GeneralSettings',
  SiteSettings: 'SiteSettings',
  ThemeSettings: 'ThemeSettings',
  EmailSubscription: 'EmailSubscription'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
