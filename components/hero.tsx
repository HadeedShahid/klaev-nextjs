import Image from 'next/image';
import { SignupForm } from './signup-form';

export function Hero() {
  return (
    <section className="breakout relative h-screen w-full flex flex-col items-center justify-between bg-[#E6EAEE] overflow-hidden pt-32">
      <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight mb-4">
          Migrating to Something Better
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 font-medium">
          We’re currently upgrading the Klaev experience. Hang tight, we’ll be back online soon.
        </p>
        <SignupForm />
      </div>

      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-end justify-center">
        <Image
          src="/assets/hero.png"
          alt="Hero Graphic"
          width={1200}
          height={800}
          className="object-contain object-bottom w-full h-full max-w-6xl"
          priority
        />
      </div>
    </section>
  );
}
