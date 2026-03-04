import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
	const t = useTranslations("notFound");
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4 px-8">
			<h2 className="font-bold text-2xl">{t("title")}</h2>
			<Link href="/" className="text-sm underline underline-offset-4 hover:text-zinc-600">
				{t("back")}
			</Link>
		</main>
	);
}
