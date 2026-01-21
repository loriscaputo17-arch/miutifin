type Props = {
  name: string;
  avatar: string;
  bio: string;
};

export default function HostSection({ name, avatar, bio }: Props) {
  return (
    <section className="mt-12 px-6 max-w-8xl mx-auto">
      <h2 className="text-xl text-white mb-4">Host</h2>

      <div className="flex gap-4 items-center">
        <img src={avatar} className="h-14 w-14 rounded-full" />
        <div>
          <p className="text-white font-medium">{name}</p>
          <p className="text-white/60 text-sm">{bio}</p>
        </div>
      </div>
    </section>
  );
}
