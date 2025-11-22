"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().optional(),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
});

export default function ContactContent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // 環境変数を取得(formspreeのエンドポイント)
  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("送信が完了しました", {
          description: "お問い合わせありがとうございます。",
          duration: 5000,
        });
        form.reset();
      } else {
        toast.error("送信に失敗しました", {
          description: "もう一度お試しください。",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("エラーが発生しました", {
        description: "通信エラーが発生しました。もう一度お試しください。",
        duration: 5000,
      });
    }
  }

  return (
    <section
      id="contact"
      className="pointer-events-none flex h-screen w-full snap-start snap-always items-center justify-start p-4 md:p-20"
    >
      <div className="pointer-events-auto w-full md:w-1/2">
        <div className="[&>main]:container-none [&>main]:pt-0">
          <main className="container mx-auto px-4 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          お名前<span className="ml-1 text-red-500">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          メールアドレス
                          <span className="ml-1 text-red-500">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          電話番号
                          <span className="ml-2 text-sm text-gray-400">
                            (任意)
                          </span>
                        </FormLabel>
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
                        <FormLabel>
                          お問い合わせ内容
                          <span className="ml-1 text-red-500">*</span>
                        </FormLabel>
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
          </main>
        </div>
      </div>
    </section>
  );
}
