import CardSchool from '@/ui/organisms/Card'
import PublicLayout from '@/ui/templates/PublicLayout'

export default function Home() {
  return (
    <PublicLayout>
      <div>
        <CardSchool
          imageUrl="https://portalpopline.com.br/wp-content/uploads/2022/08/harry-potter-serie.jpg"
          textTitle="Nome"
          textTag="Bairro"
          textSub="Endereço Completo"
        />
      </div>
    </PublicLayout>
  )
}
