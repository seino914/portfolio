"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send email using mailto link
      const subject = encodeURIComponent(
        "ポートフォリオサイトからのお問い合わせ"
      );
      const body = encodeURIComponent(`
        名前: ${values.name}
        メールアドレス: ${values.email}
        電話番号: ${values.phone}

        お問い合わせ内容:
        ${values.message}
      `);
      window.location.href = `mailto:tonosaki914@icloud.com?subject=${subject}&body=${body}`;

      toast.success("お問い合わせを送信しました");
      form.reset();
    } catch (error) {
      toast.error("エラーが発生しました。もう一度お試しください。");
    }
  }

  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="py-16 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-12">Contact</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お名前</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="山田 太郎"
                        className="border-purple-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@example.com"
                        className="border-purple-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話番号</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="090-1234-5678"
                        className="border-purple-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お問い合わせ内容</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="お問い合わせ内容を入力してください"
                        className="min-h-[150px] border-purple-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                送信する
              </Button>
            </form>
          </Form>
        </motion.div>
      </section>
    </main>
  );
}
