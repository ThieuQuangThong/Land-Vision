﻿// <auto-generated />
using System;
using Land_Vision.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Land_Vision.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Land_Vision.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Land_Vision.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Citys");
                });

            modelBuilder.Entity("Land_Vision.Models.DetailPurchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("VipId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("VipId");

                    b.ToTable("DetailPurchases");
                });

            modelBuilder.Entity("Land_Vision.Models.District", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Districts");
                });

            modelBuilder.Entity("Land_Vision.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("LinkImage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Land_Vision.Models.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Latitude")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Longtitude")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PropertyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PropertyId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("Land_Vision.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ApproveStatus")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(1);

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("NumberOfView")
                        .HasColumnType("int");

                    b.Property<int>("PropertyId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("isHide")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("transactionType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PropertyId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Land_Vision.Models.Property", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AddressNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Area")
                        .HasColumnType("double");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int>("Direction")
                        .HasColumnType("int");

                    b.Property<double>("FrontangeArea")
                        .HasColumnType("double");

                    b.Property<int>("Interior")
                        .HasColumnType("int");

                    b.Property<int>("Juridical")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfBath")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfBed")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfFloor")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<int>("StreetId")
                        .HasColumnType("int");

                    b.Property<int?>("WardId")
                        .HasColumnType("int");

                    b.Property<double>("WayIn")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("StreetId");

                    b.HasIndex("WardId");

                    b.ToTable("Properties");
                });

            modelBuilder.Entity("Land_Vision.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("CanSell")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Land_Vision.Models.Street", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("DistrictId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("DistrictId");

                    b.ToTable("Streets");
                });

            modelBuilder.Entity("Land_Vision.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AvatarLink")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("BackOfIdentityCard")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CodeExpires")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("EmailExpiresTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FrontOfIdentityCard")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("IdentityNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsAccuracy")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("RefreshTokenExpireTime")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("ValidateResetToken")
                        .HasColumnType("longtext");

                    b.Property<int?>("VipId")
                        .HasColumnType("int");

                    b.Property<bool>("isHide")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("VipId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Land_Vision.Models.Vip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PostLimit")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<int>("VipLevel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Vips");
                });

            modelBuilder.Entity("Land_Vision.Models.Ward", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("DistrictId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("DistrictId");

                    b.ToTable("Wards");
                });

            modelBuilder.Entity("Land_Vision.Models.DetailPurchase", b =>
                {
                    b.HasOne("Land_Vision.Models.User", "User")
                        .WithMany("DetailPurchases")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Land_Vision.Models.Vip", "Vip")
                        .WithMany("DetailPurchases")
                        .HasForeignKey("VipId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Vip");
                });

            modelBuilder.Entity("Land_Vision.Models.District", b =>
                {
                    b.HasOne("Land_Vision.Models.City", "City")
                        .WithMany("Districts")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("Land_Vision.Models.Image", b =>
                {
                    b.HasOne("Land_Vision.Models.Post", "Post")
                        .WithMany("Images")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Land_Vision.Models.Position", b =>
                {
                    b.HasOne("Land_Vision.Models.Property", "Property")
                        .WithMany("Positions")
                        .HasForeignKey("PropertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Property");
                });

            modelBuilder.Entity("Land_Vision.Models.Post", b =>
                {
                    b.HasOne("Land_Vision.Models.Property", "Property")
                        .WithOne("Post")
                        .HasForeignKey("Land_Vision.Models.Post", "PropertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Land_Vision.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Property");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Land_Vision.Models.Property", b =>
                {
                    b.HasOne("Land_Vision.Models.Category", "Category")
                        .WithMany("Properties")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Land_Vision.Models.Street", "Street")
                        .WithMany("Properties")
                        .HasForeignKey("StreetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Land_Vision.Models.Ward", "Ward")
                        .WithMany("Properties")
                        .HasForeignKey("WardId");

                    b.Navigation("Category");

                    b.Navigation("Street");

                    b.Navigation("Ward");
                });

            modelBuilder.Entity("Land_Vision.Models.Street", b =>
                {
                    b.HasOne("Land_Vision.Models.District", "District")
                        .WithMany("Streets")
                        .HasForeignKey("DistrictId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("District");
                });

            modelBuilder.Entity("Land_Vision.Models.User", b =>
                {
                    b.HasOne("Land_Vision.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Land_Vision.Models.Vip", "Vip")
                        .WithMany("Users")
                        .HasForeignKey("VipId");

                    b.Navigation("Role");

                    b.Navigation("Vip");
                });

            modelBuilder.Entity("Land_Vision.Models.Ward", b =>
                {
                    b.HasOne("Land_Vision.Models.District", "District")
                        .WithMany("Wards")
                        .HasForeignKey("DistrictId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("District");
                });

            modelBuilder.Entity("Land_Vision.Models.Category", b =>
                {
                    b.Navigation("Properties");
                });

            modelBuilder.Entity("Land_Vision.Models.City", b =>
                {
                    b.Navigation("Districts");
                });

            modelBuilder.Entity("Land_Vision.Models.District", b =>
                {
                    b.Navigation("Streets");

                    b.Navigation("Wards");
                });

            modelBuilder.Entity("Land_Vision.Models.Post", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("Land_Vision.Models.Property", b =>
                {
                    b.Navigation("Positions");

                    b.Navigation("Post")
                        .IsRequired();
                });

            modelBuilder.Entity("Land_Vision.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Land_Vision.Models.Street", b =>
                {
                    b.Navigation("Properties");
                });

            modelBuilder.Entity("Land_Vision.Models.User", b =>
                {
                    b.Navigation("DetailPurchases");

                    b.Navigation("Posts");
                });

            modelBuilder.Entity("Land_Vision.Models.Vip", b =>
                {
                    b.Navigation("DetailPurchases");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Land_Vision.Models.Ward", b =>
                {
                    b.Navigation("Properties");
                });
#pragma warning restore 612, 618
        }
    }
}
