import { useState } from "react";
import "./App.css";
import intervalToDuration from "date-fns/intervalToDuration";
import dayjs from "dayjs";

function App() {
	const [count, setCount] = useState(0);

	const today = dayjs();
	const diasRestantes = dayjs("2023-02-14 14:00").diff(today, "days");
	const horasRestantes = dayjs("2023-02-14 14:00").diff(today, "hours");
	return (
		<div className="w-full h-full relative">
			<div className="flex justify-center ">
				<h1 className="font-medium text-[#d45df6]">Chá da Analu - 12/02/2023</h1>
			</div>
			<div className="w-full h-full mt-10">
				<ul className="w-3/4 flex mt-10 mx-auto ">
					<li className="opacity-70 hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md py-2">
						Evento
					</li>
					<li className="opacity-70 hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md py-2">
						Confirmar Presença
					</li>
					<li className="opacity-70 hover:opacity-100 w-full cursor-pointer font-medium bg-[#d45df6] rounded-t-md py-2">
						+ Detalhes
					</li>
				</ul>
				<div className="h-[1px] bg-[#d45df6] w-full"></div>
				<section className="flex mt-10 ">
					<div className="w-1/2 flex flex-col">
						<div className="self-start">
							<h2 className="font-medium text-left">Faltam...</h2>
							<p>
								{diasRestantes > 0
									? `${diasRestantes} dias e ${
											horasRestantes - diasRestantes * 24
									} horas`
									: `${
											horasRestantes - diasRestantes * 24
									} horas`}
							</p>
						</div>

            <div className="self-start mt-5">
							<h2 className="font-medium text-left">Local do Evento</h2>
							<p>Rua César Gonçalves dos Santos, 168 - Niterói-RJ</p>
						</div>

            <div className="self-start mt-5">
							<h2 className="font-medium text-left">Contato</h2>
							<p>(21) 97742-9776</p>
						</div>
					</div>
					<div className="w-1/2">
						<img
							className="object-cover rounded-lg shadow-md"
							src="/home.jpeg"
							alt="Imagem Cha da Analu"
						/>
					</div>
				</section>
				<section>Presença</section>
				<section>Detalhes</section>
			</div>
		</div>
	);
}

export default App;
