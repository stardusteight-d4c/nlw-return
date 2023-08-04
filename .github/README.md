<div align="center">
  <img src="logo.png" width="222" height="78" />
</div>

<h1 align="center">
  Widback, Feedback Widget
</h1>

The application is a Feedback Widget that allows users to provide feedback about the application or website they are using. The frontend of the application is developed with React and TypeScript and uses the Axios, Vite, Headless UI, TailwindCSS and html2canvas libraries. The backend is developed with Node.js and TypeScript and uses the Express, Jest, Prisma and Nodemailer libraries.

On the frontend, the Feedback Widget is embedded in the application or website page. The widget consists of a floating button that users can click to open a feedback form. The form includes fields such as the type of feedback (suggestion, problem, praise, etc.), a detailed description of the feedback, and the possibility to send a screenshot of the problem encountered. The html2canvas library is used to capture the user's screen image.

The frontend sends the form information to the backend using the Axios library. On the backend, the form information is stored in the database using the Prisma ORM. In addition, the backend uses the Nodemailer email service to send an automatic email to the team responsible for the application with the feedback received.

The application uses automated testing with Jest on the backend to ensure code quality and application security.

In summary, the Feedback Widget is an application developed with modern and efficient technologies that allows users to provide feedback on the application or website they are using, with the possibility of sending a screenshot to facilitate understanding of the problem.

## :hammer_and_wrench: Tools

### Frontend

* React
* TypeScript
* Axios
* Vite
* Headless UI
* TailwindCSS

### Backend

* Node.js
* TypeScript
* Express
* Jest
* Prisma
* Nodemailer

## :mailbox_with_mail: Utilities
 
### Headless UI
 
Headless UI is a user interface (UI) component library for React and Vue that provides basic, accessible interface components without visual styles. The Headless UI library is based on the concept of "headless" - where components are designed to function without the visual appearance defined by the developer.

Headless UI components are designed to provide a consistent and accessible experience for users, regardless of the environment in which they are used. The library provides components for various functionalities, such as menus, modals, tabs and others, which are easily customizable and integrable with other libraries or frameworks.

Headless UI components are "decoupled" from visual styles, which means that developers can style them themselves, or with the help of other style libraries such as TailwindCSS or Bootstrap. It also means that components can be reused across different projects with different visual styles while maintaining the same core functionality.

### Html2canvas (Screenshot)

Html2canvas is a JavaScript library that allows you to capture an image of a webpage from the HTML and CSS of the page. It is used to create screenshots, that is, an image of the content displayed on the screen, for sharing or saving to a file.

By using html2canvas in conjunction with other libraries or tools, such as React or Node.js, it is possible to capture screenshots of specific elements on the page, such as a contact form or a data graph. The library works by adding a temporary HTML canvas to the page and copying the HTML and CSS content of the element you want to capture onto the canvas.

Once the canvas is created and populated with HTML and CSS content, the image is saved as a PNG or JPEG file, or can be displayed on the page. Html2canvas also offers options to customize the final image, such as adjusting the image quality and defining the position and size of the captured element.

In summary, html2canvas is a JavaScript library that allows you to capture an image of a webpage from the HTML and CSS of the page. It is used to create screenshots of specific elements on the page, which can be shared or saved to a file. The library works by adding a temporary HTML canvas to the page and copying the HTML and CSS content of the element you want to capture onto the canvas.

### Repository Pattern & Dependency Injection (DI)

The Repository Pattern is a software design pattern that defines an interface for accessing a set of data and an implementation of that interface that abstracts access to that data. The idea is that data access operations are defined in a generic interface that can be implemented in different ways, depending on the needs of the project. In this way, access to the data is decoupled from the code that consumes this data, which facilitates the maintenance and evolution of the system.

Dependency Injection (DI) is a design pattern that aims to decouple dependencies between classes in a system. Instead of each class instantiating its own dependencies, these dependencies are injected into the class via constructors, methods, or properties. This allows classes to have their dependencies replaced by other implementations, which facilitates the evolution of the system and makes it easier to carry out automated tests.

The combined use of Repository Pattern and Dependency Injection is quite common in systems that need to deal with access to databases or other external data sources. The Repository Pattern is used to define a generic interface for data access, while the Dependency Injection is used to inject a repository-specific implementation into the class that needs to access that data. In this way, data access is decoupled from the application's business logic, which makes the application more modular and easier to maintain and evolve.

### Adapter Pattern

The Adapter Pattern is a software design pattern that allows communication between two incompatible interfaces. It allows classes with incompatible interfaces to work together without modifying the source code of one of the classes.

The pattern is made up of three main elements: the Adapter, the Adaptee, and the Target. Adaptee is the existing class, with an interface that cannot be used directly by Target. Adapter is a class that provides an interface compatible with Target, but delegates the real work to Adaptee. The Target is the interface that the client uses to access the desired service.

The Adapter Pattern is used in situations where a class needs to work with another class that has an incompatible interface, such as when you want to use a third-party component in a system. Rather than modifying the component's code to meet the needs of the system, it is possible to create an adapter that allows communication between the two interfaces.

The pattern can also be used to provide a simpler interface for a complex class, or to adapt a legacy API to a new technology. Using the Adapter Pattern can help increase code reuse, reduce system complexity, and ease maintenance.

## :speech_balloon: Explanations

### Screenshot implementation with Supabase Storage

In this topic I will detail the flow of one of the features of this project, which is the screenshot feature, this project has a simple backend with a single route with a single endpoint, so the screenshot feature follows the same flow as the upload of feedback, but with only a few deviations.

Gmail, one of the most used webmail services in the world, does not support base64 rendering of images, the src property of images must contain a URL following the HTTP protocol, so it was necessary to convert the generated image into base64 to a file and store it on a cloud storage service that will provide a public URL.

```tsx
// server/src/components/WidgetForm/Steps/FeedbackContentStep.tsx

<ScreenshotButton
  screenshot={screenshot}
  onScreenshotTook={setScreenshot}
/>

// web/components/WidgetForm/ScreenshotButton.tsx

export function ScreenshotButton({
  screenshot,
  onScreenshotTook,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('img/png')

    onScreenshotTook(base64image)
    setIsTakingScreenshot(false)
  }

  // ...

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className={style.withoutScreenshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  )
}
```

#### html2canvas Library

The script allows you to take "screenshots" of webpages or parts of it, directly on the users browser. The screenshot is based on the DOM and as such may not be 100% accurate to the real representation as it does not make an actual screenshot, but builds the screenshot based on the information available on the page.

The script traverses through the DOM of the page it is loaded on. It gathers information on all the elements there, which it then uses to build a representation of the page. In other words, it does not actually take a screenshot of the page, but builds a representation of it based on the properties it reads from the DOM.

As a result, it is only able to render correctly properties that it understands, meaning there are many CSS properties which do not work. For a full list of supported CSS properties, check out the supported features page.

All the images that the script uses need to reside under the same origin for it to be able to read them without the assistance of a proxy. Similarly, if you have other canvas elements on the page, which have been tainted with cross-origin content, they will become dirty and no longer readable by html2canvas.

```ts
// web/node_modules/html2canvas/dist/types/index.d.ts

declare const html2canvas: (element: HTMLElement, options?: Partial<Options>) => Promise<HTMLCanvasElement>;
```

The html2canvas function takes as an argument the element that should be generated ("which should have a Screenshot"), and returns an `HTMLCanvasElement`.

* <strong>`HTMLCanvasElement`</strong>

The HTMLCanvasElement interface provides properties and methods for manipulating the layout and presentation of screen elements. The HTMLCanvasElement interface also inherits the properties and methods of the `HTMLElement` interface.

* <strong>Method: `HTMLCanvasElement.toDataURL()`</strong>

Returns a data-URL containing a representation of the image in the format specified by the type parameter (defaults to image/png). The returned image is in a resolution of 96dpi.

```tsx
const canvas = await html2canvas(document.querySelector('html')!)
const base64image = canvas.toDataURL('image/png')

console.log(base64image)
```

```
>> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYAAADlCAYAAAC4X6xuAAAgAElEQVR4Xu3dB5idVYE38DPpk0mvJAQSEggEpIYukFAFKYoUF7F8a0FQ1
/1UVv12bbhW7LIKoujqLmJBRXo3CR1CFQKEmiAkoYVJZlImM8n3njfcycxkyr137ty5987v5SEk9576O+/wPPw573mrqquHbgouAgQIECBAgAABAgQIECBAoGACmzZ1/Z/amTIjR45O+t0UYpXW9TZ
/1vraut05c44Jd945r2Bj1xABAgSKIXDwwXPD/Pk3ttNVVavPqtI
/bvmsKvkg81lt7cq0bPysqyubMl210fb7KsFqrmTKEyBAgAABAgQIECBAgACBzgUEq+4QAgQIdC4gWHWHECBAgAABAgQIECBAgAABAlsJCFbdFAQIEBCsugcIECBAgAABAgQIECBAgACBHAUEqzmCKU6AQJ
8TsGO1zy25CRMgQIAAAQIECBAgQIAAga4FBKtdGylBgEDfFhCs9u31N3sCBAgQIECAAAECBAgQINCugGDVjUGAAIHOBQSr7hACBAgQIECAAAECBAgQIEBgKwHBqpuCAAECglX3AAECBAgQIECAAAECBAgQI
JCjgGA1RzDFCRDocwJ2rPa5JTdhAgQIECBAgAABAgQIECDQtYBgtWsjJQgQ6NsCgtW+vf5mT4AAAQIECBAgQIAAAQIE2hUQrLoxCBAg0LmAYNUdQoAAAQIECBAgQIAAAQIECGwlIFh1UxAgQECw6h4gQIAA
AQIECBAgQIAAAQIEchQQrOYIpjgBAn1OwI7VPrfkJkyAAAECBAgQIECAAAECBLoWEKx2baQEAQJ9W0Cw2rfX3+wJECBAgAABAgQIECBAgEC7AoJVNwYBAgQ6FxCsukMIECBAgAABAgQIECBAgACBr
// ...
```

#### handleSubmmitFeedback

In order to send the feedback to the backend, we must first convert the base64 string image generated in the frontend into a file and this file must be sent to some file storage service, many services that provide Backend as a Service currently also provide some kind of Cloud Storage service such as Firebase Storage or Supabase Storage, in this project we implement Supabase to the fronend to send our file.

```ts
// web/src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

To instantiate the Supabase client and access the credentials, first we must create a new project in Supabase, and then go to Storage and create a new Bucket, in this case the bucket created was screenshots, a bucket is like if it was a root folder in which you will identify your resources, the scope of files that will be stored there. 

```tsx
// web/src/components/WidgetForm/Steps/FeedbackContentStep.tsx

const STORAGE_URL = `https://oxgapcqpowafqdnxqmoe.supabase.co/storage/v1/object/public/screenshots/`

async function handleSubmmitFeedback(event: FormEvent) {
  event.preventDefault()
  setSendingFeedback(true)

  if (screenshot) {
    const uid = new ShortUniqueId({ length: 15 })
    const fileName = `${uid()}.png`

    function dataURLtoFile(dataurl: any, filename: string) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

    const file = dataURLtoFile(screenshot, fileName)
    const imageUrl = STORAGE_URL + fileName

    await supabase.storage
      .from('screenshots')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })
      .then(async () => {
        await api.post('/feedbacks', {
          type: feedbackType,
          comment,
          screenshot: imageUrl,
        })
      })
      .catch((error) => console.log(error))
  } else {
    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    })
  }

  setSendingFeedback(false)
  onFeedbackSent()
}
```

After configuring the storage environment in Supabase and instance of your client in our project, we can have access to all possible data management methods for our cloud backend, including methods related to Storage. So we can store our image in the subbase bucket with the following call:

```tsx
await supabase.storage
  .from('screenshots')
  .upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })
  .then(async () => {
    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot: imageUrl,
    })
  })
  .catch((error) => console.log(error))
```

So if there is a screenshot, the API call will only be made if the image was successfully saved, so we have access to the public URL of our image with `STORAGE_URL + fileName`.

<br />

### Repository Pattern and Dependency Injection (DI) 

This is the application's only route and endpoint, a POST method that will send feedback to a database and send it to a specific email:

```ts
// server/src/routes.ts

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const prismaFeedbacksRespository = new PrismaFeedbacksRespository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRespository,
    nodemailerMailAdapter,
  );

  try {
    const { type, comment, screenshot } = req.body;
    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
```

Note that this route provides some classes, such as `PrismaFeedbacksRespository()`, `NodemailerMailAdapter()` and `SubmitFeedbackUseCase()`, the first two classes are responsible for implementing the methods of `SubmitFeedbackUseCase()` so their instances are being passed to `SubmitFeedbackUseCase()`, because according to its constructor for such a class to be instantiated it is necessary to pass two private properties, that is `feedbacksRepository` and `mailAdapter` are dependencies of `SubmitFeedbackUseCase()`:

```ts
// server/src/use-cases/submit-feedback-use-case.ts

import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required.");
    }

    if (!comment) {
      throw new Error("Comment is required.");
    }

    if (
      screenshot &&
      !screenshot.startsWith(
        "https://oxgapcqpowafqdnxqmoe.supabase.co/storage/v1/object/public/screenshots/",
      )
    ) {
      throw new Error("Invalid screenshot storage link.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
    
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src=${screenshot} style="width: 900px; height: 500px; display: inline-block; margin-inline: auto;" />`
          : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
```

But these properties are just interfaces, contracts that must be implemented through other classes, then notice that the use case class `SubmitFeedbackUseCase()` is executing the methods of these properties "feedbacksRepository and mailAdapter" passing the data that is expected in the parameters, but those who implement the functionality are the classes responsible for implementing these contracts, that must implement all methods of the contract:

```ts
// server/src/repositories/feedbacks-repository.ts

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}

// server/src/repositories/prisma/prisma-feedbacks-repository.ts

export class PrismaFeedbacksRespository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });
  }
}
```

<br />

### Adapter Pattern, Interfaces and Contracts 

The Adapter has the role of converting the interface of a class into another interface expected by the clients. The Adapter allows certain classes to work together which would otherwise be impossible because of their incompatible interfaces. With it, it is possible not to depend directly on code that is not in the domain of our application.

The Adapter pattern helps solve this problem (among many others) by adding an adapter under my domain in the application. The function of the Adapter object is to adapt calls from within my application to the external framework or lib.

This can also be used for other purposes, such as adapting legacy code, adding functionality to classes, or doing any kind of adaptation needed by your application.

We can think of the Adapter as a Coupling in Astronautics, referring to the operation of establishing physical contact, that is, a physical connection between two spacecraft and activating the mechanisms to keep them in contact).

It is widely used to define boundaries within application layers, for example in the Domain Driven Design model and following the principle of Encapsulation, the business logic, as well as the use cases must be completely decoupled from the infrastructure layer , that is the core must not know about frameworks or databases, so we use for example the Repository Pattern or Adapter Pattern to encapsulate and protect the application from the infrastructure layer to the logic layer of business and data access logic layer use cases.

So in this application, as we don't want to depend on the logic and implementation of Nodemailer for sending email, so we make an interface that `SubmitFeedbackUseCase()` will be dependent on, but it will only know this interface and not the email sending logic with Nodemailer. Thus, the application will only depend on the Adapter, which is the MailAdapter, which can be coupled to any third-party library.

```ts
// server/src/adapters/mail-adapter.ts

export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}

// server/src/use-cases/submit-feedback-use-case.ts

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
    
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src=${screenshot} style="width: 900px; height: 500px; display: inline-block; margin-inline: auto;" />`
          : "",
        `</div>`,
      ].join("\n"),
    });
  }
}

// server/src/adapters/nodemailer/nodemailer-mail-adapter.ts

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.ethereal.email",
  auth: {
    user: "stardusteight.d4cc@gmail.com",
    pass: process.env.TWO_STEP_VERIF_PASS, // get in google Two-step verification
    // 1. Google Account 2. Security > Enable two-step verification 3. Generate app password
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <stardusteight.d4cc@gmail.com>",
      to: "stardusteight.d4cc@gmail.com",
      subject,
      html: body,
    });
  }
}
```

#### Applicability

 - you don't want your code to depend directly on third-party or legacy code;
 - you want to use an existing class but its interface is not compatible with the interface your code or domain needs;
 - you want to reuse several subclasses that don't have certain functionality but it's impractical to extend the code of each one just to add the desired functionality (Decorator does that too).

<br />

### Deployment Settings: Environment Variables, Build & Deploy Scripts

#### Database

In this topic I will detail the main points needed to deploy on an Infrastructure as a service (IaaS) or Hardware as a Service (HaaS) platform, such as Planet Scale to scale up a database MySQL data or Railway to host the backend server of some application.

We already know that environment variables are essential to make our code run in different environments, whether development or production. For example, the backend of this application has the following environment variables in the `.env` file located in the root directory of the project:

```ini
server/.env

TWO_STEP_VERIF_PASS="****"
PORT="****"
DATABASE_URL="****"
SHADOW_DATABASE_URL="****"
```

So, in addition to protecting our credentials, we can change these variables when promoting the application to the production environment. For example, our cloud database hosted on Planet Scale, does not need any environment variable attached to the project, but rather provides a connection url already with the necessary credentials for our application to be able to access and make the necessary actions. operations, something like:

```ini
DATABASE_URL='mysql://d2mqykmsdfe5kbtshju0:************@aws-sa-east-1.connect.psdb.cloud/feedbacks?sslaccept=strict'
```

In development we can change this url to one that indicates a local file like `"file:./dev.db"` that will serve as SQLite database, in production we must reference a database also in production.

#### Promote to production

To deploy a backend server for an application on the web, we prefer to configure the <strong>build scripts</strong>, which will compile the files in TypeScript to JavaScript, install the project's dependencies and prepare the proper environment to run our server: 

```json
"scripts": {
  "test": "jest",
  "dev": "nodemon src/server.ts",
  "build": "npm install && npx prisma generate && npm run compile",
  "compile": "tsc",
  "start": "node dist/server.js"
},
```

The `"build"` script above will install the project dependencies with `npm install`, generate the Prisma Client and install the `@prisma/client`, which you will need to re-run the `npx prisma generate` command after every change made to your Prisma schema to update the generated Prisma Client code, and finally it will compile our TypeScript code to JavaScript with the `npm run compile` command which executes `tsc` and thus generates our production directory in the `dist` folder. However, for `tsc` to run as expected, we must configure the `tsconfig.json` file, there are several options there that can disrupt the execution of our code at build time, such as leaving the `Watch Mode` enabled and thus `tsc` command will never finish executing, you also need to specify the `rootDir` the `root directory` of the project in which the TypeScript compiler should work to generate the `JavaScript` files, as well as the `outDir` which case not specified, the JS files will be generated in the same directories as the TS files.

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "CommonJS",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strictPropertyInitialization": false,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "ts-node": {
    "transpileOnly": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

By running the `"build"` script we will have our `"dist"` directory ready to be run in production.

And so to run our server, just run the `"start"` script specified in `package.json`. Which will execute our file that serves as a gateway for our application, which is in `/dist/server.js`.

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>
