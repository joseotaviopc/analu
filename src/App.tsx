import { useEffect, useState } from "react";

// import dayjs from "dayjs";
import client from "./lib/sanity.config";
// import { uuid } from "@sanity/uuid";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";

/* ---------- Validation ---------- */
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

import { lista } from "./list";
import "./App.css";

const initForm = {
	_id: "",
	_type: "",
	confirm: null,
	no_confirm: null,
	name: "",
	has_escorts: false,
	escorts_quantity: 0,
	escort_names: "",
	message: "",
};

type TForm = typeof initForm;

function App() {
	// const today = dayjs();
	// const diasRestantes = dayjs("2023-02-14 14:00").diff(today, "days");
	// const horasRestantes = dayjs("2023-02-14 14:00").diff(today, "hours");

	const [, setGuestsConfirmed] = useState(0);
	const [confirmMessage] = useState("");
	const [, setDisableButton] = useState(false);
	const [showList] = useState(false);
	// const [presente, setPresente] = useState(false);

	// async function saveInSanity(userDoc: TForm) {
	// 	setConfirmMessage("Aguarde...");

	// 	try {
	// 		const result = await client.createIfNotExists(userDoc);
	// 		console.log(result);

	// 		setConfirmMessage("Obrigado!");
	// 	} catch (error) {
	// 		setConfirmMessage("Erro... tente mais tarde");
	// 	}
	// }

	// async function handleSubmit(values: TForm, reset: () => void) {
	// 	setDisableButton(true);
	// 	const escorts: string[] = [];
	// 	values.escort_names
	// 		?.split(",")
	// 		.forEach((item: string) => escorts.push(item.trim()));
	// 	const data = {
	// 		_type: "guests",
	// 		_id: uuid(),
	// 		confirm: values.confirm,
	// 		no_confirm: values.no_confirm,
	// 		name: values.name,
	// 		has_escorts: values.has_escorts,
	// 		escorts_quantity: escorts.filter((item) => {
	// 			if (item.trim().length > 1) {
	// 				return item.trimEnd().trimStart();
	// 			}
	// 			return null;
	// 		}).length,
	// 		escort_names: values.escort_names,
	// 		message: values.message,
	// 	};

	// 	saveInSanity(data);
	// 	setShowList(true);
	// 	reset();
	// }

	// function scrollToElement(id: string) {
	// 	const element = document.getElementById(id);
	// 	element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	// }

	useEffect(() => {
		let unmounted = false;

		const getDataFromSanity = async (sanityClient = client) => {
			const query = `*[_type == "guests"] {
				confirm,
				escorts_quantity,
			}`;

			const data = await sanityClient.fetch(query);

			if (unmounted) return;

			if (!data) return;

			// const escorts = data.reduce((acc: number, curr: TForm) => acc + curr.escorts_quantity, 0)
			const confirmed =
				data.reduce(
					(acc: number, curr: TForm) => acc + curr.escorts_quantity,
					0
				) + data.filter((item: TForm) => item.confirm === "sim").length;

			console.log("Total confirmed", confirmed);

			setGuestsConfirmed(confirmed);
			setDisableButton(false);
			// setTimeout(() => {
			// 	setShowList(prev => true)
			// }, 2000)
		};

		getDataFromSanity();

		return () => {
			unmounted = true;
		};
	}, [confirmMessage === "Obrigado!"]);

	/* ----------- Validation Formik -------- */
	// const validationSchema = Yup.object().shape({
	// 	name: Yup.string()
	// 		.matches(
	// 			/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
	// 			"* Nome só pode conter letras."
	// 		)
	// 		.required("* Campo obrigatório"),
	// 	confirm: Yup.boolean(),
	// 	no_confirm: Yup.boolean(),
	// 	has_escorts: Yup.boolean(),
	// 	escorts_quantity: Yup.number(),
	// 	message: Yup.string(),
	// 	escort_names: Yup.string(),
	// });

	// function handlePresente() {
	// 	if (!presente) {
	// 		setPresente(!presente);
	// 	}
	// }

	return (
		<div className="w-full mx-auto h-auto relative p-4 lg:p-8">
			<div className="flex justify-center ">
				<h1
					id="title"
					className="font-medium text-4xl md:text-5xl text-[#d45df6]"
				>
					Chá da Analu - 12/02/2023
				</h1>
			</div>

			<div className="w-full h-auto mt-10">
				{/* ----------- NAV -----------  */}
				<ul className="w-full md:w-3/4 flex mt-10 mx-auto ">
					<a
						href="#evento"
						className="text-gray-50 whitespace-nowrap opacity-70 hover:text-white hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md p-2 border-t-[1px] border-l-[1px] border-r-[1px] border-[#b32ed8]"
					>
						<li>Evento</li>
					</a>
					{showList ? (
						<a
							href="#presenca"
							className="text-gray-50 whitespace-nowrap opacity-70 hover:text-white hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md p-2 border-t-[1px] border-l-[1px] border-r-[1px] border-[#b32ed8]"
						>
							<li>Confirmar Presença</li>
						</a>
					) : (
						<a
							href="#lista"
							className="text-gray-50 whitespace-nowrap opacity-70 hover:text-white hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md p-2 border-t-[1px] border-l-[1px] border-r-[1px] border-[#b32ed8]"
						>
							<li>Lista de presentes</li>
						</a>
					)}
					<a
						href="#detalhes"
						className="text-gray-50 whitespace-nowrap opacity-70 hover:text-white hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md p-2 border-t-[1px] border-l-[1px] border-r-[1px] border-[#b32ed8]"
					>
						<li>+ Detalhes</li>
					</a>
				</ul>
				<div className="h-[1px] bg-[#d45df6] w-full"></div>

				{/* ----------- EVENTO -----------  */}
				<section
					id="evento"
					className="w-full flex flex-col-reverse gap-5 lg:flex-row mt-10 "
				>
					<div className="w-full lg:w-1/2 flex flex-col">
						{/* <div className="self-start">
							<h2 className="font-medium text-left">Faltam...</h2>
							<p>
								{diasRestantes > 0
									? `${diasRestantes} dias e ${
											horasRestantes - diasRestantes * 24
									  } horas`
									: `${horasRestantes - diasRestantes * 24} horas`}
							</p>
						</div> */}

						<div className="self-start mt-5">
							<h2 className="font-medium text-left">Local do Evento</h2>
							<p className="flex gap-2">
								Rua César Gonçalves dos Santos, 168 - Niterói-RJ
								<a
									href="https://goo.gl/maps/tc5bGFGQjBsjHwMfA"
									target={"_blank"}
									rel="noreferrer"
								>
									{" "}
									<FiMapPin
										className="cursor-pointer"
										size={20}
										color="#b32ed8"
									/>
								</a>
							</p>
						</div>

						<div className="self-start mt-5">
							<h2 className="font-medium text-left">Contato</h2>
							<a
								href="tel:21977429776"
								className="flex cursor-pointer gap-2 items-center"
							>
								<FiPhoneCall size={20} color="#b32ed8" />
								(21) 97742-9776
							</a>
							<a
								href="tel:21969962000"
								className="flex cursor-pointer gap-2 items-center"
							>
								<FiPhoneCall size={20} color="#b32ed8" />
								(21) 96996-2000
							</a>
						</div>

						{/* <div className="self-start mt-5">
							<h2 className="font-medium text-left">Confirmar até</h2>
							<p className="text-left">12/02!</p>
						</div> */}

						<div className="self-start mt-5">
							<h2 className="font-medium text-left text-[#b32ed8]">
								A cegonha está me trazendo para o mundo e, por isso, meus papais
								organizaram uma festa linda para a minha chegada e você é o
								nosso convidado especial. Para comemorar o último mês na barriga
								da mamãe, vamos nos encontrar?
							</h2>
						</div>
					</div>
					<div className="w-full lg:w-1/2">
						<img
							className="object-cover rounded-lg shadow-md"
							src="/home.jpeg"
							alt="Imagem Cha da Analu"
						/>
					</div>
				</section>

				{/* ----------- PRESENÇA -----------  */}
				{/* {!showList ? (
					<section className="w-full flex flex-col gap-5 mt-20">
						<h2 id="presenca" className=" text-4xl md:text-5xl font-medium text-[#d45df6]">Confirme sua presença</h2>
						{confirmMessage !== '' ? (
							<div className="flex flex-col md:flex-row items-baseline gap-2">
								<h2 className="whitespace-nowrap text-3xl font-medium text-[#d45df6]">{confirmMessage}</h2>
								{confirmMessage === 'Obrigado!' ? (
									<h2 className=" text-xl font-medium text-[#d45df6]">
										{`Já temos ${guestsConfirmed} convidado${guestsConfirmed > 1 ? 's' : ''}`}
									</h2>
								) : null }
							</div>
						) : null}
						<Formik
						initialValues={initForm}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={(values, { resetForm }) => {
							// handleSubmit(values)
						}}
					>
					{({
						errors,
						values,
						touched,
						isSubmitting,
						setFieldValue,
						handleBlur,
						resetForm
					}) => (
						<Form>
								<div className="flex items-center mt-5">
									<Field
										type="radio"
										value="sim"
										name="confirm"
										id="confirm"
										aria-describedby="confirm"
										className="h-4 w-4 mr-2 border-gray-300 focus:ring-2 focus:ring-blue-300"
									/>
									<label className="text-[#b32ed8] font-medium" htmlFor="confirm">
										Sim.
										{values.confirm === "sim" ? (
											<span className="text-sm text-zinc-600 ml-2">
												Oba!
											</span>
										) : null }
									</label>
								</div>

								<div className="flex items-center">
									<Field
										type="radio"
										value="nao"
										name="confirm"
										id="confirm"
										className="h-4 w-4 mr-2 border-gray-300 focus:ring-2 focus:ring-blue-300"
										/>
									<label className="text-[#b32ed8] font-medium" htmlFor="confirm">
										Não.
										{values.confirm === "nao" ? (
											<span className="text-sm text-zinc-600 ml-2">
												Poxa.... :-(
											</span>
										) : null }
									</label>
								</div>

								<div className="flex flex-col items-start justify-center mt-5">
									<label className={`${values.confirm === false ? 'text-[#d45df6]' : 'text-[#b32ed8]'} font-medium`} htmlFor="name">
										Nome e sobrenome
										<span className="ml-4 text-xs font-normal text-red-600">{errors.name ? `${errors.name}` : ''}</span>
									</label>
									<Field
										type="text"
										name="name"
										id="name"
										placeholder="Digite seu nome"
										className="h-10 w-full p-2 bg-zinc-50 placeholder:text-zinc-400 disabled:placeholder:text-zinc-300 disabled:text-zinc-300 rounded-lg text-[#b32ed8] font-medium border-[#b32ed8] focus:ring-2 focus:ring-[#b32ed8]"
									/>
								</div>

								<div className="flex items-center mt-5">
									<Field
										disabled={values.confirm === "nao"}
										type="checkbox"
										name="has_escorts"
										id="has_escorts"
										className="h-4 w-4 mr-2 border-gray-300 focus:ring-2 focus:ring-blue-300"
										aria-describedby="has_escorts"
									/>
									<label className={`${values.confirm === "nao" ? 'text-[#d45df6]' : 'text-[#b32ed8]'} font-medium`} htmlFor="has_escorts">
										Acompanhantes.
									</label>
								</div>

								{values.has_escorts ? (
									<div className="flex flex-col items-start justify-center mt-5">
										<label className={`${values.confirm === "nao" ? 'text-[#d45df6]' : 'text-[#b32ed8]'} font-medium`} htmlFor="escort_names">
											Nome dos acompanhantes.
											<span className={`${values.confirm === "nao" ? 'text-zinc-500 text-opacity-40' : 'text-zinc-500'} text-sm ml-2`}>
												(Nomes separados por vírgula)
											</span>
										</label>
										<Field
											disabled={values.confirm === "nao" || !values.has_escorts}
											placeholder="Digite o nome dos acompanhantes"
											type="input"
											name="escort_names"
											id="escort_names"
											className="h-10 w-full p-2 bg-zinc-50 placeholder:text-zinc-400 disabled:placeholder:text-zinc-300 disabled:text-zinc-300 rounded-lg text-[#b32ed8] font-medium border-[#b32ed8] focus:ring-2 focus:ring-[#b32ed8]"
										/>
									</div>
								) : null}

								<div className="flex flex-col items-start justify-center mt-5">
									<label className={`${values.confirm === "nao" ? 'text-[#d45df6]' : 'text-[#b32ed8]'} font-medium`} htmlFor="message">
										Deixe uma mensagem
									</label>
									<textarea
										name="message"
										value={values.message}
										onChange={(e) => setFieldValue('message', e.target.value)}
										id="message"
										placeholder="Digite sua mensagem"
										className="h-40 w-full p-2 align-top bg-zinc-50 placeholder:text-zinc-400 disabled:placeholder:text-zinc-300 disabled:text-zinc-300 rounded-lg text-[#b32ed8] font-medium border-[#b32ed8] focus:ring-2 focus:ring-[#b32ed8]"
									/>
								</div>

							{values.confirm !== null ? (
								<button
									type="submit"
									onClick={() => handleSubmit(values, resetForm)}
									disabled={disableButton || !!errors.name}
									className="w-auto mt-5 cursor-pointer disabled:opacity-60 disabled:cursor-default disabled:bg-opacity-50 shadow-md border-[1px] border-[#b32ed8] bg-[#b32ed8] rounded-lg p-2"
								>
									{values.confirm === "sim" ? `Oba, confirme!` : `Poxa...`}
								</button>
							) : null }

						</Form>
						)}
					</Formik>
					</section>
				) : null} */}

				{/* ----------- LISTA -----------  */}
				{/* {showList ? ( */}
				<section
					id="lista"
					className="w-full flex flex-col justify-center items-center gap-5 mt-20"
				>
					<h2
						id="presenca"
						className=" text-4xl md:text-5xl font-medium text-[#d45df6]"
					>
						Lista de presentes
					</h2>
					{/* <p className="text-base">Em breve...</p> */}
					<p className="text-lg whitespace-normal self-start">
						<span className="font-bold">Atenção:</span> Você irá apenas escolher
						o presente que irá presentear. A compra será em qualquer loja que
						desejar.
					</p>
					<div className=" flex flex-wrap justify-center md:justify-start gap-5">
						{lista.map((item, index) => {
							return (
								<div
									key={index}
									className={`w-60 h-60 p-4 flex flex-col gap-2 items-center justify-center rounded-lg border-[1px] border-[#b32ed8] bg-fuchsia-300 ${
										item.hasItem ? "bg-zinc-400 border-zinc-700" : ""
									}`}
								>
									<h2
										className={`text-lg font-semibold ${
											item.hasItem ? "text-zinc-500" : ""
										}`}
									>
										{item.nome}
									</h2>
									<img
										src={item.img}
										alt={item.alt}
										className={`w-auto h-3/4 rounded-lg object-cover opacity-60 ${
											item.hasItem ? "opacity-20" : ""
										}`}
									/>
									{/* <p className="text-base">Presentear com este</p> */}
								</div>
							);
						})}
					</div>
				</section>
				{/* ) : null} */}

				{/* ----------- DETALHES -----------  */}
				<section id="detalhes" className="w-full flex flex-col gap-5 mt-20">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d918.4620984813396!2d-43.03091831188968!3d-22.955809864159722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99863d5f93592d%3A0xb2b8aee90b2c69f6!2sR.%20C%C3%A9sar%20Gon%C3%A7alves%20dos%20Santos%2C%20168%20-%20Itaipu%2C%20Niter%C3%B3i%20-%20RJ%2C%2024346-113!5e0!3m2!1spt-BR!2sbr!4v1675368586596!5m2!1spt-BR!2sbr"
						className="border-0 w-full px10 rounded-lg min-h-[450px]"
						allowFullScreen={true}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</section>

				{/*  */}
			</div>

			{/* ----------- GOTO_TOP ----------- */}
			<a
				href="#title"
				className="fixed bottom-5 right-5 rounded-full bg-[#d45df6] p-1 opacity-70 hover:opacity-100"
			>
				<svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697L11.4697 7.46967C11.7626 7.17678 12.2374 7.17678 12.5303 7.46967L18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303C18.2374 14.8232 17.7626 14.8232 17.4697 14.5303L12 9.06066L6.53033 14.5303C6.23744 14.8232 5.76256 14.8232 5.46967 14.5303Z"
						fill="#b32ed8"
					/>
				</svg>
			</a>
		</div>
	);
}

export default App;
